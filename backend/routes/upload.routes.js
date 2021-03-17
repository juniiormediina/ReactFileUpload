const express = require("express");
const router = express.Router();

router.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: "file is not found" });
  }

  // accessing the file
  const file = req.files.file;

  //  mv() method places the file inside public directory
  file.mv(`${__dirname}/../../frontend/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    // returing the response with file path and name
    return res.json({ name: file.name, path: `/uploads/${file.name}` });
  });
});

module.exports = router;
