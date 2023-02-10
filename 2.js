var fs = require("fs");
const { exit } = require('process');
let data = require("./data")
let hotels = [608516, 80938581, 535615, 28642364, 14095879]
// fs.existsSync("2.json")
if (!fs.existsSync("csv")){
    fs.mkdirSync("csv")
}
var j = 0
var hotel_pages = [51,6,13,28,6]

for (const hotel of hotels) {
    var i = 1 // current page
    var totalPages = hotel_pages[j]
    const hotelFile = `csv/${hotel}.csv`

    if (fs.existsSync(hotelFile)){
        fs.rmSync(hotelFile)
    }
    fs.appendFileSync(hotelFile, "id|userId|nickName|ratingAll|ratingLocation|ratingFacility|ratingService|ratingRoom|commentLevel|travelType|roomName|language|content|checkinDate|usefulCount|grade\n")
    while (i <= totalPages) { // loop while there is something to fetch
        let fileName = `data/${hotel}-${i.toString().padStart(3,"0")}.json`
        console.info(fileName)
        let d = JSON.parse(fs.readFileSync(fileName,{encoding:"utf-8"}))
        // console.log(d.groupList[0].commentList)
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
            // if (
                // r.feedbackList.length < 1 ||
                // r.language != 'en' && !r.translatedContent // not translated 
                // ) {
                //     i++;
                //     continue;
                //     // return;
                // }
    
            var out = ""
            out += `${r.id}|"${r.userInfo.userId}"|"${r.userInfo.nickName.replace(/[^a-z0-9]/gi, '')}"|`
            out += `${r.ratingInfo.ratingAll}|${r.ratingInfo.ratingLocation}|${r.ratingInfo.ratingFacility}|${r.ratingInfo.ratingService}|${r.ratingInfo.ratingRoom}|${r.ratingInfo.commentLevel}|`
            out += `"${r.travelTypeText}"|`
            out += `"${r.roomName}"|`
            out += `"${r.language}"|`
            if (r.language == 'en')
            {
                out += `"${r.content.replaceAll("\n"," ")}|`
            }
            else {
                out += `${r.translatedContent ? r.translatedContent.replaceAll("\n"," ") : r.content.replaceAll("\n"," ")}|`
            }
            out += `"${r.checkinDate}"|`
            out += `${r.usefulCount}|`
            // out += `${r.pictureCount},`
            out += `${r.userInfo.grade.grade || 0}`
            // id,userId,nickName,ratingAll,ratingLocation,ratingFacility,ratingService,
            // ratingRoom,commentLevel,travelType,roomName,commentLevel,language,
            // content,checkinDate,usefulCount,pictureCount,grade
            fs.appendFileSync(hotelFile, `${out}\n`)
        }

        i++
    }
    j++
}