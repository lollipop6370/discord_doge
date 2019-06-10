const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client();

var game_start = 0;
var game_number;
var max_num,min_num;
bot.on('ready', () => {
	console.log(`成功登入 ${bot.user.tag}!`);
});

bot.login(config.token);

bot.on('message', msg => {
	if (msg.content == '嗨') {
		msg.reply(msg.content);
	}
	if(checkCommand(msg,"speak")){
		let args = msg.content.slice('!'.length).trim().split(' ');
		msg.channel.send(args[1]);
	}
	if(checkCommand(msg,"playgame")){
		if(!game_start){
			game_start = 1;
			msg.channel.send("猜數字遊戲!玩家請說\"我是87\"加入遊戲!");
			msg.channel.send("遊戲開始!");
			max_num=100;
			min_num=0;
			game_number = getRandom(0,100);
		}
	}
	if(checkCommand(msg,"_:(´ཀ`」 ∠):")){
		msg.channel.send("((( ←～（o ｀▽´ )oΨ");
	}
	if(checkCommand(msg,"抽")){
		let img_number = getRandom(1,352);
		msg.channel.send({files:["./img/  ("+img_number+").png"]});
	}
	if(game_start){
		let r = /^[0-9]*[1-9][0-9]*$/;//正整數
		if(r.test(msg.content)){//判斷正整數
			msg.channel.send(msg.member.toString()+': '+msg.content);
			if(msg.content>max_num || msg.content<min_num){
				msg.channel.send("輸入區間為 "+min_num+' ~ '+max_num);
			}
			else if(msg.content>game_number){
				max_num = msg.content;
				msg.channel.send("數字為 "+min_num+' ~ '+max_num);
			}
			else if(msg.content<game_number){
				min_num = msg.content;
				msg.channel.send("數字為 "+min_num+' ~ '+max_num);
			}
			else if(msg.content==game_number){
				msg.channel.send("遊戲結束! 勝利者為"+msg.member.toString()+'!');
				game_start = 0;
			}
		}
	}
});

function checkCommand(message,commandName){
	return message.content.toLowerCase().startsWith("!" + commandName);
};

function getRandom(min,max){
    return Math.floor(Math.random()*max)+min;
};