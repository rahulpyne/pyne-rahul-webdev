module.exports = function (app) {
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);
    app.post("/api/user/:userId/website", createWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createWebsite(req, res) {
        var newWeb = req.body;
        var userId = req.params.userId;
        newWeb._id = (new Date()).getTime() + "";
        newWeb.developerId =userId;
        websites.push(newWeb);
        res.json(newWeb);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var newWeb = req.body;
        for(var w in websites) {
            if( websites[w]._id == websiteId) {
                websites[w].name = newWeb.name;
                websites[w].description = newWeb.description;
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == websiteId;
        });
        res.json(website);
    }

    function findAllWebsitesForUser(req, res){
        var userId = req.params.userId;
        var websiteUser = [];
        for(w in websites){
            if(websites[w].developerId == userId){
                websiteUser.push(websites[w]);
            }
        }
        res.json(websiteUser);
    }
};