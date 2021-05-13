const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.get("/", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    const lista = Controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
});

router.get("/:uuid", (req, res, next) => {
    const { uuid } = req.params;
    console.log(uuid);
    const group = Controller.get(uuid)
        .then((group) => {
            response.success(req, res, group, 200);
        })
        .catch(next);
});

router.post("/", (req, res, next) => {
    Controller.post(req.body, true)
        .then((group) => {
            response.success(req, res, group, 201);
        })
        .catch(next);
});

router.put("/", (req, res, next) => {
    Controller.put(req.body, false)
        .then((group) => {
            response.success(req, res, group, 201);
        })
        .catch(next);
});

router.delete("/:uuid", (req, res, next) => {
    const { uuid } = req.params;
    console.log(uuid);
   Controller.del(uuid)
        .then((group) => {
            response.success(req, res, group, 200);
        })
        .catch(next);
});




module.exports = router;