module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller");
  var router = require("express").Router();
  const upload = require ('../middelewares/upload')

  router.post("/", tutorials.create);
  router.post("/upload", upload.single("file"), tutorials.upload);
  router.get("/getbooks",tutorials.getbooks);
  router.post("/mail",tutorials.sendmail)

  app.use('/api', router);
};

