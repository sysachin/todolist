var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mySchema =new Schema({
	description:String,
	status:String
});

var list =mongoose.model("list",mySchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getItems',function(req,res,next){
	list.find({},function(err,items){
		if(!err)res.json(items);
	});
 
});
router.post('/changeStatus',function(req,res,next){
	list.findOneAndUpdate({_id:req.body.id},{status:req.body.status},function(err,item){
		if(!err)res.send("Status Updated");
	});
});
router.post('/addItems',function(req,res,next){
	console.log(req.body);
     var item = new list(
		 {
			 description:req.body.description,
			 status:req.body.status
		 }
	 );
	 item.save();
	 res.send("Element added");
});



module.exports = router;
