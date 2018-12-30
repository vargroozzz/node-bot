var reg = function (name, age, coll) {
	// const MongoClient = require("mongodb").MongoClient, 
	// assert = require('assert');
	// const url = "mongodb://localhost:27017/bot_db";
	// var insertDocuments = function(db, callback) {
	//   		var collection = db.collection(coll);

	//   		collection.insertOne(text, function(err,result){

	// 		if(err){
	//         return console.log(err);
	//     }
	//     console.log(result.ops);
	//     }) 

	//   	}

	const mongoClient = new MongoClient(url, { useNewUrlParser: true });
	mongoClient.connect(url, function(err, db){
		assert.equal(null, err);
	  	console.log("Connected correctly to server");
	  	var collection = db.collection(coll);
	  	collection.insertOne( { name: name, age: eval(age) } ); 
	  	
	  	console.log(collection);

		// const db = client.db("Bot_DB");
		// const collection = db.collection("users");
		// let user = {name: "Eduard", age: 16};
		// collection.insertOne(user, function(err,result){

		// 	if(err){
	 //        return console.log(err);
	 //    }
	 //    console.log(result.ops);
	     
	 	results = collection.find({ age: { $gt: 5 } });
	 	console.log(results);
	    db.close();

		// });
	});
}
module.exports.reg = reg;