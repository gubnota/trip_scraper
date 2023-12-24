const fs = require('fs');
const { exit } = require('process');
// let data = require("./data")
let hotels = [1194420,1816428,65358839,88620731,97345363,106119817]
// var d = fs.readFileSync('data/1194420/translate-17.json');
// var c = JSON.parse(d).Response.transArray
// var a = [];
// c.forEach((e)=>a.push(e))
// JSON.stringify(c);

for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    const outFile = `csv/${hotel}.csv`
fs.writeFileSync(outFile,"text|id|nickName|commentCount|createDate|checkInDate|rating|commentLevel|roomTypeName|travelTypeText\n")
    console.log(`./data/${hotel}`)
    var data = JSON.parse(fs.readFileSync(`./data/${hotel}.json`));
    var comments = data.comments;
    var translations = data.translations;

    for (let i = 0; i < comments.length; i++) {
    try {
var c = comments[i]
var text = c.content.replaceAll("\n"," ").replaceAll("\n"," ");
if (c.language != "en"){
 for (let j = 0; j < translations.length; j++) {
    if(translations[j].transKey == c.securityKey) {
        text = translations[j].content.replaceAll("\n"," ").replaceAll("\n"," ")
        break;
    }
 }
} //aB7X20yrf4RO367Qwp1s6z3G5SPBb2JAX2CDrwlotkIHR6WKZjgqKg==_review_760454061
fs.appendFileSync(outFile,`${text}
${c.id}
${c.userInfo.nickName.replace(/[^a-z0-9]/gi, '')}
${c.userInfo.commentCount}
${c.createDate}
${c.checkInDate}
${c.rating}
${c.commentLevel}
${c.roomTypeName}
${c.travelTypeText}   
`.replaceAll("\n","|")+"\n");

    }
     catch(e){
        console.log(e)
    }
    }
// var out = JSON.stringify({"translations":translations,"comments":comments})
// fs.writeFileSync(`./data/${hotel}.json`,out)
}