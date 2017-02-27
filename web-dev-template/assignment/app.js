module.exports = function (app) {
    /*app.get("/api/user", requestFromClient);

    function requestFromClient(req, res) {
        console.log("Got a ping from Client");
        res.sendStatus(200);
    }*/
    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
    require("./services/page.service.server")(app);
    //require("./services/widget.service.server")(app);
};