const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });
mongoClient.connect(function(err, client){

	const db = client.db("Bot_DB");
	const collection = db.collection("users");
	let user = {name: "Eduard", age: 16};
	collection.insertOne(user, function(err,result){

		if(err){
        return console.log(err);
    }
    console.log(result.ops);
    client.close();
	});
});