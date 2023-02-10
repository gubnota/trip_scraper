var request = require('request');
var fs = require("fs");
const { exit } = require('process');
let data = require("./data")
let hotels = [608516, 80938581, 535615, 28642364, 14095879]
// fs.existsSync("2.json")
if (!fs.existsSync("data")){
    fs.mkdirSync("data")
}
var j = 0
var hotel_pages = [51,6,13,28,6]

for (const hotel of hotels) {
    var i = 1 // current page
    var totalPages = hotel_pages[j] // initial total number of pages to fetch
    while (i <= totalPages) { // loop while there is something to fetch
    let body = {...data.body, ...{hotelId:hotel, "pageIndex":i, "pageSize":50}}
    let fileName = `data/${hotel}-${i.toString().padStart(3,"0")}.json`
    console.info(fileName)
    request.post(
    'https://www.trip.com/restapi/soa2/24077/clientHotelCommentList',
    { json: body,
    headers: {
        "Host":"www.trip.com",
        'Content-Length': JSON.stringify(body).length,
        'Content-Type': 'application/json'
    } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body.groupList[0].commentList.length);
            if (body.totalCount) {
                totalPages = Math.ceil(body.totalCount / 50)
            console.log('totalPages', totalPages)
            }
            // console.log(JSON.stringify(body))
            // console.log(body.groupList[0].commentList);
            fs.writeFileSync(fileName, JSON.stringify(body))
        }
        else {
            console.error("[!] error",fileName)
            // console.error("error", response.statusCode, response.statusMessage)
        }
    }
);

    // totalPages = Math.ceil(2517 / 50)

    i++
    }
    j++
}
// request.post(
//     'https://www.trip.com/restapi/soa2/24077/clientHotelCommentList',
//     { json: body,
//     headers: {
//         "Host":"www.trip.com",
//         'Content-Length': JSON.stringify(body).length,
//         'Content-Type': 'application/json'
//     } },
//     function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             // console.log(body.groupList[0].commentList.length);
//             console.log(body.totalCount)
//             // console.log(JSON.stringify(body))
//             // console.log(body.groupList[0].commentList);
//         }
//         else {
//             // console.error("error", response.statusCode, response.statusMessage)
//         }
//     }
// );
/*
var request = require('request');

request.post(
    'https://www.trip.com/restapi/soa2/24077/clientHotelCommentList',
    {    
            headers: {
            "Host":"www.trip.com",
          'Content-Length': JSON.stringify(body).length,
          'Content-Type': 'application/json'
        },

    },
    { json: body },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        }
        else {
            console.error("error", error, response)//response.statusCode, response.statusMessage)
        }
    }
);
 */