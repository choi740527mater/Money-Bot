const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`${client.user.tag} 시작됨`);
});

client.on('message', msg => {
  if(msg.author.bot) return;
  if(msg.author.id === client.user.id) return;

  const id = msg.author.id;
  const name = msg.author.username;

  const filePath = `./Money-data/${id}.json`;

  !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

  const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const today = new Date();
  const date = "" + today.getFullYear() + today.getMonth() + today.getDate();
  const howMuch = 5000;

  if(msg.content === "개발자 머니 줘"){
    let saveUser = {};
    if(user.id) {
      if(user.date === date) {
        msg.reply(`오늘은 이미 받으셨네요? 내일 받아봐요!`);
        saveUser = user;
      }
      else {
        msg.reply(`${howMuch}원이 당신에게 지급됐어요!\n${name}님의 예전 개발자 머니는 ${user.money}이고 현재 개발자 머니는 ${user.money + howMuch}이네요!`);
        saveUser = {
          id,
          name,
          date,
          money : user.money + howMuch,
        }
      }
    }
    else {
      msg.reply(`${name} 개발자님! ${howMuch}원이 지급됐어요!`);
      saveUser = {id, name, date, money : howMuch};
    }

    fs.writeFileSync(filePath, JSON.stringify(saveUser));
  }

  if(msg.content === "개발자 머니 잔액"){
    user.id ? msg.reply(`${name} 개발자님의 현재 개발자 머나는 ${user.money}입니다!!`) : msg.reply(`어? 개발자 머니가 없는 것 같은데요?`);
  }


});

client.login('봇 토큰을 입력해주세요');
