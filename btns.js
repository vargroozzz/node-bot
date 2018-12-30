    // Получение id клиента из сообщения
    // getClientIdFromMessage: function (message) {
    //     return message.hasOwnProperty('chat') ? message.chat.id : message.from.id;
    // },

// Создание обычной кнопки с callback_data
var buildDefaultButton = function (text, callback_data) {
    return [{
        text: text,
        callback_data: callback_data
    }];
}

// Создание кнопки-ссылки на внешний ресурс
var buildUrlButton = function (text, url) {
    return [{
        text: text,
        url: url
    }];
}

// Заготовка для кнопки "поделиться"
var buildShareButton = function (text, shareUrl) {
    return [{
        text: text,
        url: 'https://telegram.me/share/url?url=' + shareUrl
    }];
}

// Сборка настроек для сообщения
var buildMessageOptions = function (buttons) {
    return {
        parse_mode: "HTML",
        disable_web_page_preview: false,
        reply_markup : JSON.stringify({
            inline_keyboard: buttons
        })
    };
}
module.exports.buildDefaultButton = buildDefaultButton;
module.exports.buildUrlButton = buildUrlButton;
module.exports.buildShareButton = buildShareButton;
module.exports.buildMessageOptions = buildMessageOptions;