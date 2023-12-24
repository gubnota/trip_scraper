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
    var comments = [];
    var translations = [];
    const files = fs.readdirSync(`./data/${hotel}`);
    console.log(`./data/${hotel}`)

    for (let i = 0; i < files.length; i++) {
        const f = files[i];
            console.log(`./data/${hotel}/${f}`)
            try{
            if(f.includes("getCommentList")){
            var clf = fs.readFileSync(`./data/${hotel}/${f}`);
            var cts = JSON.parse(clf).data.commentList
            for (let j = 0; j < cts.length; j++) {
                comments.push(cts[j]);
            }
        }
        else
         if (f.includes("translate")){
            var trans = fs.readFileSync(`./data/${hotel}/${f}`);
            var cts = JSON.parse(trans).Response.transArray
            for (let j = 0; j < cts.length; j++) {
                translations.push(cts[j]);
            }
        }
    } catch(e){
        console.log(e)
    }
    }
var out = JSON.stringify({"translations":translations,"comments":comments})
fs.writeFileSync(`./data/${hotel}.json`,out)
}