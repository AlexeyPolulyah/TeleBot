const TelegramApi = require('node-telegram-bot-api')

const token = '6301919920:AAFG3GT_tW1rkEL6i9w8pfHnMiFtryrQ5MQ'

const bot = new TelegramApi(token,{polling:true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text:"1",callback_data:'1'},{text:"2",callback_data:'2'},{text:"3",callback_data:'3'},{text:"4",callback_data:'4'}],
            [{text:"5",callback_data:'5'},{text:"6",callback_data:'6'},{text:"7",callback_data:'7'},{text:"8",callback_data:'8'}],
            [{text:"9",callback_data:'9'},{text:"10",callback_data:'10'},{text:"11",callback_data:'11'},{text:"12",callback_data:'12'}],
            [{text:"13",callback_data:'13'},{text:"14",callback_data:'14'},{text:"15",callback_data:'15'},{text:"16",callback_data:'16'}],
            [{text:"17",callback_data:'17'},{text:"18",callback_data:'18'},{text:"19",callback_data:'19'},{text:"20",callback_data:'20'}],
        ]
    })
}
const againOptions = {
    reply_markup:JSON.stringify({
        inline_keyboard:[
            [{text:"Играть заново",callback_data:'/again'}]
        ]
    })
}

bot.on("callback_query", msg=>{
    const data = msg.data
    const chatId = msg.message.chat.id
    if(data === "/again"){
        return startGame(chatId)
    }
    console.log(chats[chatId])
    if(parseInt(data) === chats[chatId]){
        return bot.sendMessage(chatId,'Ты угадал!',againOptions)
    } else {
        return bot.sendMessage(chatId,"Ты не угадал!",againOptions)
    }
})

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "Сейчас я загадаю число от 1 до 20, а ты должен его отгадать!")
    const RandomNumber = Math.floor(Math.random()*20+1)
    chats[chatId] = RandomNumber
    await bot.sendMessage(chatId, "Можешь отгадывать!",gameOptions)
}

const start = () => {
  
bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/info', description: 'Информация о пользователе'},
    {command: "/game", description: `Сыграть в игру "Угадай число"`}
])
bot.on('message',async msg=>{
    const text = msg.text
    const chatId = msg.chat.id

    if(text ==='/start'){
       return bot.sendMessage(chatId,'Добро пожаловать!')
    }
    if(text ==='/info'){
        return bot.sendMessage(chatId,`Вас зовут ${msg.from.first_name} ${msg.from.last_name}`)
    }
    if(text === '/game'){
        return startGame(chatId)
    }
    return bot.sendMessage(chatId, "Я тебя не понимаю!")
    // bot.sendMessage(chatId,`Написано: ${text}`)
    // console.log(msg)
})  
}

start()