module.exports = function (app) {
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.get("/api/widgetavailableTypes", findAllAvailableTypes);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/page/:pageId/widget", createWidget);
    app.put("/page/:pageId/widget",sortable);



    var widgets =[
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    var availableTypes = ["HEADING","HTML","IMAGE","YOUTUBE"];

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage); //  have to define this endpoint here because upload is getting defined here

    function uploadImage(req, res) {
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;
        var destination = myFile.destination;


        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

    function sortable(req,res){
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        var widgetsList = [];
        widgets = widgets.filter(function(x) {
            if(pageId === x.pageId) {
                widgetsList.push(x);
            }
            return widgets.indexOf(x) < 0;
        });
        var widget  = widgetsList[initial];
        widgetsList.splice(initial, 1);
        widgetsList.splice(final,0, widget);
        widgets.push.apply(widgets, widgetsList);
        res.json(widgets);
    }

    function findAllAvailableTypes(req,res){
        res.json(availableTypes);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var l in widgets) {
            if(widgets[l]._id === widgetId) {
                widgets.splice(l, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        newWidget._id = (new Date()).getTime() + "";
        newWidget.pageId =pageId;
        if(newWidget.widgetType === "HEADING" ||  newWidget.widgetType === "HTML"){
            newWidget.text ='';
        }
        else if(newWidget.widgetType === "IMAGE" ||  newWidget.widgetType === "YOUTUBE"){
            newWidget.url ='';
        }
        widgets.push(newWidget);
        res.json(newWidget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;
        for(var l in widgets) {
            if( widgets[l]._id == widgetId) {
                widgets[l]= newWidget;
                res.json(widgets[l]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (l) {
            return l._id == widgetId;
        });
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        var widgetPage = [];
        for(l in widgets){
            if(widgets[l].pageId == pageId){
                if((widgets[l].widgetType === "HEADING" ||  widgets[l].widgetType === "HTML") && widgets[l].text === ''){
                    widgets.splice(l,1);
                }
                else if((widgets[l].widgetType === "IMAGE" ||  widgets[l].widgetType === "YOUTUBE") && widgets[l].url === ''){
                    widgets.splice(l,1);
                }
                else {
                    widgetPage.push(widgets[l]);
                }
            }
        }
        res.json(widgetPage);
    }
};