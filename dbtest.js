var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');

var testTSchema = new mongoose.Schema({
  name : String,
  value : Number
});
mongoose.model('testT', testTSchema);
var testT = mongoose.model('testT');

/*
testT.findOne({name: "NoSuch"}, function(err, doc){
  console.log("findOne");
  console.log(doc);
  if(doc == null)
    console.log("null");
  if(doc == "")
    console.log("Empty String");
});
*/

testT.find({name: "NoSuch"}, function(err, doc){
 console.log("find");
 console.log(doc.length);
  console.log(doc);
  if(doc == null)
    console.log("null");
  if(doc == [])
    console.log(doc.length);
});
