const router = require("express").Router();

router.get("", (_, res) => {
  res.status(200).json({ message: "Welcome to the Task API" });
});


module.exports = router;