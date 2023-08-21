const express = require("express");
const DoctorModel = require("../model/doctoremodel");
const doctorRouter = express.Router();

doctorRouter.get("/", async (req, res) => {
  try {
    const data = await DoctorModel.find(req.query);
    res.status(200).json({ msg: "all data", data });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
doctorRouter.post("/", async (req, res) => {
  try {
    const doctor = await DoctorModel(req.body);
    doctor.save();
    res.status(200).json({ msg: "posted successfully", doctor });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

doctorRouter.patch("/:doctId", async (req, res) => {
  const { doctId } = req.params;
  try {
    await DoctorModel.findByIdAndUpdate({ _id: doctId }, req.body);
    res.status(200).json({ msg: "apdated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

doctorRouter.delete("/:doctId", async (req, res) => {
  const { doctId } = req.params;
  try {
    await DoctorModel.findByIdAndDelete({ _id: doctId });
    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = doctorRouter;
