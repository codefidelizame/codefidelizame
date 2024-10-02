const { Router } = require('express');

const router = Router();

router.use("/admin", require("./admin"));
router.use("/auth", require("./auth"))
router.use("/clientes", require("./clients"));
router.use("/services", require("./services"));


module.exports = router;