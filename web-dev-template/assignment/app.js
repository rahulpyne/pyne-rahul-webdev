module.exports = function (app) {

    var userModel = require('./model/user/user.model.server');
    var websiteModel = require('./model/website/website.model.server');
    var pageModel = require('./model/page/page.model.server');
    var widgetModel = require('./model/widget/widget.model.server');

    require("./services/user.service.server")(app,userModel);
    require("./services/website.service.server")(app,websiteModel);
    require("./services/page.service.server")(app,pageModel);
    require("./services/widget.service.server")(app,widgetModel);
};