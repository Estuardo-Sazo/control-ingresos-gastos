const express = require("express");
const secure = require("./secure");
const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.get("/", (req, res, next) => {
    const lista = Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
});



router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    const user = Controller.get(id)
        .then((user) => {
            response.success(req, res, user, 200);
        })
        .catch(next);
});

router.post("/", (req, res, next) => {
    Controller.upsert(req.body, true)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
});

router.put("/", secure("update"), (req, res, next) => {
    Controller.upsert(req.body, false)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
});

router.post('/follow/:id', secure("follow"), (req, res, next) => {
    Controller.follow(req.user.id, req.params.id)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(next);
});

router.get('/:id/following', (req, res, next) => {
    Controller.following(req.params.id)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(next);
});

module.exports = router;