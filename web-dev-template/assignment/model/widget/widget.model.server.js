/**
 * Created by Rahulpyne on 21-Mar-17.
 */
var model = null;
var mongoose = require('mongoose');
var q = require('q');
var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('Widget', widgetSchema);

// api
widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;
widgetModel.setModel = setModel;

module.exports = widgetModel;



function createWidget(pageId, widget) {
    var deffered = q.defer();
    widget._page = pageId;
    widgetModel.findOne({_page: pageId})
        .sort({position:1})
        .exec(function (err, lastWidget) {
            if(lastWidget)
                widget.position = lastWidget.position+1;
            else
                widget.position = 0;
            widgetModel.create(widget, function (err, widget) {
                if(err)
                    deffered.reject(err);
                else {
                    model.pageModel.findPageById(widget._page)
                        .then(function (page) {
                            page.widgets.push(widget._id);
                            page.save(function (err) {
                                if(err)
                                    deffered.reject(err);
                                else
                                    deffered.resolve(widget);
                            });
                        });
                }
            });
        });
    return deffered.promise;
}

function findAllWidgetsForPage(pageId) {
    var deffered = q.defer();
    widgetModel.find({_page: pageId})
        .sort({position:1})
        .exec(function (err, widgets) {
            if(err)
                deffered.reject(err);
            else
                deffered.resolve(widgets);
        });
    return deffered.promise;
}

function findWidgetById(widgetId) {
    var deffered = q.defer();
    widgetModel.findById(widgetId, function (err, widget) {
        if(err)
            deffered.reject(err);
        else {
            deffered.resolve(widget);
        }
    });
    return deffered.promise;
}

function updateWidget(widgetId, widget) {
    var deffered = q.defer();
    widgetModel.findByIdAndUpdate(widgetId, widget, function (err, widget) {
        if(err)
            deffered.reject(err);
        else
            deffered.resolve(widget);
    });
    return deffered.promise;
}

function deleteWidget(widgetId) {
    var deffered = q.defer();
    widgetModel.findById(widgetId, function (err, widget) {
        if(err)
            deffered.reject(err);
        else {
            widgetModel.update({_page: widget._page, position: {$gt: widget.position}}, {$inc: {position: -1}}, {multi: true}, function (err, success) {
                if(err)
                    deffered.reject(err);
                else {
                    widgetModel.findByIdAndRemove(widgetId, function (err, widget) {
                        if(err)
                            deffered.reject(err);
                        else {
                            widget.remove();
                            deffered.resolve(widget);
                        }
                    });
                }
            });
        }
    });
    return deffered.promise;
}
function reorderWidget(pageId, start, end) {
    return widgetModel.find({_page: pageId}, function (err, widgets) {
            widgets.forEach(function (widget) {
                if (start < end) {
                    if (widget.position == start) {
                        widget.position = end;
                        widget.save();
                    }
                    else if (widget.position > start && widget.position <= end) {
                        widget.position = widget.position - 1;
                        widget.save();
                    }
                } else {
                    if (widget.position == start) {
                        widget.position = end;
                        widget.save();
                    }

                    else if (widget.position < start && widget.position >= end) {
                        widget.position = widget.position + 1;
                        widget.save();
                    }
                }
            });
        });
}

function setModel(_model) {
    model = _model;
}
