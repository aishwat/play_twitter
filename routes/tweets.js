var request = require('request');
var globals= require('./globals.js');
var mongoose = require('mongoose');
var tweetSchema = require('../db/tweetSchema.js');

// var Tweet = require('../db/Tweet.js');

var tweets = {
	//custom search | maintains db 
	//creates collection if new hash_tag entered
	//updates in same collection
	search_hash: function(req,res){
		var hash = req.params.hash_tag || req.query.hash_tag;
		var params = {
			url: globals.host+'1.1/search/tweets.json',
			method:'GET',
			headers:{
				'Authorization': 'Bearer '+globals.access_token
			},
			qs: {
				q: '%23'+ hash,
				count:50,
				include_entities:false,
				result_type:'recent'
			}
		}

		request(params, function(err, _res, body){
			if(err|| _res.statusCode!=200) {
				console.log({err:err , _res:_res.body});
				res.status(500).send('Internal server error'); //refine later
			} else {
				// console.log(_res.body);
				// res.send(JSON.parse(_res.body));
				//create model
				var model = mongoose.model(hash, tweetSchema, hash); //although terible idea

				collect_tweets(model,JSON.parse(_res.body),function(matching_tweets){
					res.send(matching_tweets);
				})				
			}
		});
	}
}

function collect_tweets(model,json_res,callback){
	var matching_tweets = [];
	//make async for later
	for(var status in json_res.statuses){
		var _tweet = {_id:json_res.statuses[status].id_str,
			text: json_res.statuses[status].text,
			created_at:json_res.statuses[status].created_at,
			in_db_at: Date.now()};
		matching_tweets.push(_tweet);
		model.findOneAndUpdate({'_id':_tweet._id}, _tweet, {upsert:true}, function(err, doc){
			if (err) {
				console.log('err: '+err);
				//handle later
				// return res.send(500, { error: err });
			}
			// return res.send("succesfully saved");
		});
	}
	callback(matching_tweets);
}	

module.exports = tweets;