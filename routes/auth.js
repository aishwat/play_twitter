var request = require('request');
var client_credentials = 'V1J3SUFPOENzd0ZFNzc0ZmtVek9UVWRZQjpVS3FYaGcwM213eU5xdWc5czVZV2pNWUlHM2dGcVhHaGFmc1lRUnlnU2plRXVZS1RDcQ==';
var globals= require('./globals.js');

var auth ={
	//If current bearer token expires - vl depend on expiry set in token
	generate_token: function(req,res){
		var params = {
			url: globals.host+'oauth2/token',
			method:'POST',
			headers:{
				'Authorization': 'Basic '+client_credentials,
				'Content-Type':'application/x-www-form-urlencoded'
			},
			form: {
				grant_type: 'client_credentials'
			}
		}
		request(params, function(err, _res, body){
			if(err|| _res.statusCode!=200) {
				console.log('error: '+err);
				res.status(500).send('Internal server error'); //refine later
			} else {
				globals.access_token = JSON.parse(body).access_token;
				console.log(globals.access_token);
				res.send('success');
			}
		});
	},
	init:function(){
		console.log('----init----');
		var _req = {};
		var _res = {status:function(code){
			return this;
		},send:function(str){
			console.log(str);
			console.log('------------')
			return this;
		}}
		auth.generate_token(_req,_res);

	}
}
module.exports = auth;