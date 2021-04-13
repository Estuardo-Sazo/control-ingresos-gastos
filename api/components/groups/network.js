const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();

router.get("/", (req, res,next) => {
    const lista = Controller.list()
      .then((lista) => {
        response.success(req, res, lista, 200);
      })
      .catch(next);
});
  

module.exports = router;