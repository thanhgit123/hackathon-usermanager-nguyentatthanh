const express = require("express");
const router = express.Router();
const data = require("../mysql");

router.get("/task", async (req, res) => {
  let result = await data.getTask();
  res.send(result);
});

router.post("/addTask", async (req, res) => {
  let result = await data.addTask(req.body);
  res.send(result);
});

router.delete("/del/:id", async (req, res) => {
  const { id } = req.params;
  data.deleteTask(id);
  let result = await data.getTask();
  res.send(result);
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  data.update(id, req.body);
  let result = await data.getTask()
  res.send(result);
})
 router.put("/changStatus/:id", async (req, res) => {
  const { id } = req.params;
  data.changStatus(id, req.body);
  let result = await data.getTask()
  res.send(result);
 })
module.exports = router;
