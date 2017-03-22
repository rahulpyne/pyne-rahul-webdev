module.exports = function (app,websiteModel) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);


    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .deleteWebsite(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }


    function createWebsite(req, res) {
        var userId = req.params.userId;
        var newWebsite = req.body;
        websiteModel
            .createWebsiteForUser(userId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .updateWebsite(websiteId, newWebsite)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .findWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        websiteModel
            .findAllWebsitesForUser(userId)
            .then(function (websites) {
                res.json(websites);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};