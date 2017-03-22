module.exports = function (app,pageModel) {
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);
    app.post("/api/website/:websiteId/page", createPage);


    function deletePage(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .deletePage(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function createPage(req, res) {
        var websiteId = req.params.websiteId;
        var newPage = req.body;
        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;
        pageModel
            .updatePage(pageId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllPagesForWebsite(req, res){
        var websiteId = req.params.websiteId;
        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};