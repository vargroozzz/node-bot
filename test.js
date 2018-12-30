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

const mongoClient = new MongoClient(new Server("localhost", 27017), {native_parser: true});

mongoClient.connect(url, function(err, db){
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
		                collection.insertOne( { name: name, age: eval(age) } ); 
		                bot.sendMessage(chatId, 'Новый пользователь добавлен!');
		            })
		        });
		    }
		});
	 	var results = collection.find({ age: { $gt: 5 } });
	 	console.log(results);
	    db.close();
	});