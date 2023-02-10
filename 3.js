var request = require('request');
const axios = require('axios')
var fs = require("fs");
const { exit } = require('process');
let data = require("./data")
let hotels = [608516, 80938581, 535615, 28642364, 14095879]
// fs.existsSync("2.json")
if (!fs.existsSync("trans")){
    fs.mkdirSync("trans")
}
var j = 0
var hotel_pages = [51,6,13,28,6]

for (const hotel of hotels) {
    var i = 1 // current page
    var totalPages = hotel_pages[j]
    while (i <= totalPages) { // loop while there is something to fetch
        let fileName = `data/${hotel}-${i.toString().padStart(3,"0")}.json`
        // console.info("filename", fileName)
        let d = JSON.parse(fs.readFileSync(fileName,{encoding:"utf8"}))
        if (d.groupList.length==0
            ) {i++;
                continue;
                // return;
            }
            for (const r of d.groupList[0].commentList) {
                if (!r.content) {
                    i++;
                    continue;
            }
            // if (r.id != 452309837) continue;
            if (r.language != 'en' && !r.translatedContent)
            {
            if (fs.existsSync(`trans/${r.id}.json`)) 
            {
                var a = JSON.parse(fs.readFileSync(`trans/${r.id}.json`,{encoding:"utf8"}))
                console.log(`translated: ${a["Response"]["transArray"][0]["content"].replaceAll("\n"," ")}`)
                continue;
            }
                // console.log(r.id, r.content, r.securityKey)
// make a translation request
let body = {...data.translation, ...{transArray: [
    {
        "content": r.content,//.replaceAll("\\n",'\n')
        "transKey": r.securityKey
    }
]}}
// fs.writeFileSync(`trans/${r.id}.json`, JSON.stringify(body))
// console.log(body)
// continue;

    // headers: { Accept: 'application/json' },
    
    axios
    .post('https://www.trip.com/restapi/soa2/15117/json/translate', body, {
        headers: {
            'Content-Length': Buffer.byteLength(JSON.stringify(body)),
            // 'Content-Type': 'text/plain',
            "Host":"www.trip.com"
        }
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(`writing ${r.id} from ${hotel}-${i.toString().padStart(3,"0")}…`)
        fs.writeFileSync(`trans/${r.id}.json`, JSON.stringify(response.data))
    }
    })
    .catch((e) => {
        console.log(`writing ${r.id} from ${hotel}-${i.toString().padStart(3,"0")}… Oops!`)
    //   console.error(e)
    })


            }
            }
            i++
        }
        j++
    }