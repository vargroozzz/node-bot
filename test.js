process.env.NTBA_FIX_319 = 1;
var TelegramBot = require('node-telegram-bot-api');
var mg = require('./db.js');
var btns = require('./btns.js');
const token='762533086:AAHfI2Ffdp4DGQwkKE90GjbaY3nO2spRaMs';
const MongoClient = require("mongodb").MongoClient,
Server = require('mongodb').Server,
Db = require('mongodb').Db, 
assert = require('assert');
const url = "mongodb://localhost:27017/bot_db";

const bot = new TelegramBot(token, {polling:true});
var messageOptions = {
    parse_mode: "HTML",
    disable_web_page_preview: false,
    reply_markup: JSON.stringify({
        inline_keyboard: [[{
            text: 'Зарегистрироваться',
            callback_data: 'reg'
        }]]
    })
};


// const MongoClient = require("mongodb").MongoClient;

// const url = "mongodb://localhost:27017/";
// const mongoClient = new MongoClient(url, { useNewUrlParser: true });
// mongoClient.connect(function(err, client){

// 	const db = client.db("Bot_DB");
// 	const collection = db.collection("users");
// 	let user = {name: "Eduard", age: 16};
// 	collection.insertOne(user, function(err,result){

// 		if(err){
//         return console.log(err);
//     }
//     console.log(result.ops);
//     client.close();
// 	});
// });



const mongoClient = new MongoClient(url, { useNewUrlParser: true });

mongoClient.connect(function(err, client){
	const db = client.db("Bot_DB");
	assert.equal(null, err);
	console.log("Connected correctly to server");
	var collection = db.collection('users');
	bot.onText(/\/start/, (msg, match) => {
	const chatId = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
	bot.sendMessage(chatId, 'Здравствуй, новый пользователь!', messageOptions);
	});

		bot.on('callback_query',  (msg, match) => {
		    const chatId = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
		    if (msg.data === 'reg') {
		        bot.sendMessage(chatId, 'Введите имя:');
		        bot.onText(/([A-Z]|[А-Я])+/, (msg, match) => {
		            const name = msg.text;
		            bot.sendMessage(chatId, `${name}, введите свой возраст:`);
		            bot.onText(/(\d\d|\d)/, (msg, match) => {
		                let age = msg.text;
		                collection.insertOne( { name: name, age: eval(age) }, async function(err, result){

		                	if (err) {
		                		return console.log(err);
		                	}
		                	console.log(result.ops);
		                	await client.close();
		                }); 
		                bot.sendMessage(chatId, 'Новый пользователь добавлен!');
		            })
		        });
		    }
		});
	});