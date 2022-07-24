var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/new', (req, res) => {
  res.render('articleForm');
});

router.post('/', (req, res) => {
  res.send(req.body);
});

router.get('/', (req, res) => {
  console.log(req.body);
  res.render('articlelist');
});

module.exports = router;
