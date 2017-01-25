var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var globals = require('./globals.js');
var tweets = require('./tweets.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(globals.access_token);
  	res.render('index', { title: 'Express' });
});

router.get('/init', auth.generate_token);
// router.get('/auth/generate-token', auth.generate_token);//sensible url mappings

router.get('/search', tweets.search_hash);
// router.get('/tweets/search-hash', tweets.search_hash);//sensible url mappings

module.exports = router;
