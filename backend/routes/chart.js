const express = require("express");
const router = express.Router();

const commonFuntion = require("./../commonFunction");
const chartController = require("./../controller/chart-controller");

router.get(`/date`, async (req, res) => {
  try {
    let response = await chartController.getDates(req.query);

    commonFuntion.responseGenerator(res, null, response, 201);
  } catch (err) {
    console.log(err);
    commonFuntion.responseGenerator(res, "Internal Server Error", null, 404);
  }
});

module.exports = router;
