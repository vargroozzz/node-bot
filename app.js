process.env.NTBA_FIX_319 = 1;
var TelegramBot = require('node-telegram-bot-api');
var mongoose = require('mongoose');
var btns = require('./btns.js');
var mlab_url = 'mongodb://vargroozzz:2009bomh@ds017231.mlab.com:17231/tg_bot_data';
mongoose.connect(mlab_url);
const token='762533086:AAHfI2Ffdp4DGQwkKE90GjbaY3nO2spRaMs';
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    telegramId: String
});
var User = mongoose.model('user', UserSchema);

var MessageSchema = new Schema({
    title: String,
    text: String
});
var Message = mongoose.model('message', MessageSchema);




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
bot.onText(/\/start/, (msg, match) => {
    const chatId = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;

    bot.sendMessage(chatId, 'Здравствуй, новый пользователь!', messageOptions);
});

bot.on('callback_query',  (msg, match) => {
    const chatId = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
    if (msg.data === 'reg') {
        bot.sendMessage(chatId, 'Введите имя:');
        bot.onText(/([A-Z]|[А-Я])+/, (msg, match) => {

            const resp = msg.text;

            
            bot.sendMessage(chatId, `${resp}, введите свой возраст:`);
            bot.onText(/\d\d/, (msg, match) => {
                let age = msg.text;
                bot.sendMessage(chatId, `Ваш возраст - ${age} лет`);
            })


        });
    }

});

// bot.onText(/\/new_user/, (msg, match) => {
//     // const chatId = msg.chat.id;

//     bot.onText(/[A-Z]*/I, function (msg) {

//     const resp = match[0];

//     bot.sendMessage(chatId, 'Введите возраст:');



// });

// });








// var notes=[];
// bot.onText(/\/напомни (.+) в (.+)/,function(msg,match){
//     var userId=msg.from.id;
//     var text=match[1];
//     var time=match[2];
//     notes.push({'uid':userId,'time':time,'text':text});
//     bot.sendMessage(userId,'Отлично! Я обязательно напомню, если не сдохну :)');
// });

// setInterval(function(){
//     for(var i=0;i<notes.length;i++){
//         var curDate=new Date().getHours()+':'+new Date().getMinutes();
//         if(notes[i]['time']==curDate){
//             bot.sendMessage(notes[i]['uid'],'Напоминаю, что вы должны: '+notes[i]['text']+' сейчас.');
//             notes.splice(i,1);
//         }
//     }
// },1000);