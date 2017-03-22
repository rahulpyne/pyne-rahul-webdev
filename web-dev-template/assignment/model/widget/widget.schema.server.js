/**
 * Created by Rahulpyne on 21-Mar-17.
 */
var mongoose = require('mongoose');
var types = ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'];
var widgetSchema = mongoose.Schema({
    _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
    type: {type: String, enum: types},
    name: String,
    text: String,
    placeholder: String,
    description: String,
    url: String,
    width: String,
    height: String,
    rows: {type: Number,default: 1},
    size: Number,
    class: String,
    icon: String,
    deletable: Boolean,
    formatted: {type: Boolean, default: false},
    dateCreated:  { type: Date, default: Date.now() },
    position: Number
}, {collection: 'widget'});

widgetSchema.post('remove', function () {
    var widget = this;
    var pageModel = require('../page/page.model.server');
    pageModel.findPageById(widget._page)
        .then(function (page) {
            var index = page.widgets.indexOf(widget._id);
            if(index > -1) {
                page.widgets.splice(index, 1);
                page.save();
            }
        });
});

module.exports = widgetSchema;
