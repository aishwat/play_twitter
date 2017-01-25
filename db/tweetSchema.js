var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
  _id:  String, //custom _id , instead of using id and _id both
  text: String,
  created_at:   String,
  in_db_at:String
});

module.exports = tweetSchema;