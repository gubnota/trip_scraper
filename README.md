# Scrape reviews from the following hotels:
- https://www.trip.com/hotels/beijing-hotel-detail-608516/ibis-hotel-beijing-sanyuan-bridge/
- https://www.trip.com/hotels/beijing-hotel-detail-80938581/citigo-hotel-sanlitun-beijing/
- https://www.trip.com/hotels/beijing-hotel-detail-535615/citigo-hotel/
- https://www.trip.com/hotels/beijing-hotel-detail-28642364/citigo-hotel-beijing-tian-anmen-square/
- https://www.trip.com/hotels/beijing-hotel-detail-14095879/citigo-house-beijing-shangdi/


# Analysis 
```sh
URL: https://www.trip.com/restapi/soa2/24077/clientHotelCommentList

Payload:
{"hotelId":608516,"pageIndex":1,"pageSize":10,"orderBy":0,"commentTagList":[],"commentTagV2List":[],"travelTypeList":[],"roomList":[],"packageList":[],"commonStatisticList":[],"UnusefulReviewPageIndex":1,"repeatComment":1,"functionOptions":["IntegratedTARating","hidePicAndVideoAgg","TripReviewsToServerOnline"],"webpSupport":true,"platform":"online","pageID":"10320668147","head":{"Version":"","userRegion":"XX","Locale":"en-XX","LocaleController":"en-XX","TimeZone":"8","Currency":"USD","PageId":"10320668147","webpSupport":true,"userIP":"","P":"37537490871","ticket":"","clientID":"1675934763370.43vce0","Frontend":{"vid":"1675934763370.43vce0","sessionID":1,"pvid":2},"group":"TRIP","bu":"IBU","platform":"PC","Union":{"AllianceID":"","SID":"","Ouid":""},"HotelExtension":{"group":"TRIP","hasAidInUrl":false,"Qid":641795021033,"WebpSupport":true,"PID":"524208d5-b8e7-443e-8636-feb135429d64"}}}
```

1. get "totalCount": 621,
2. calculate number of pages to fetch: `Math.ceil(622 / 100)` where 100 is reviews per page
3. cycle through hotel ids [608516, 80938581, 535615, 28642364, 14095879]
4. save page results if file doesn't exist (format: `<hotel_id>-<page_no>.json`)
5. go through all data to form an Excel file (csv).
 5.1. Analyze language of the review, if it's not "en" use "translatedContent" if it exists `"feedbackList": [{…}]`
```json
{
"id": 694861121,
"userInfo": {
    "userId": "_FB440839****",
    "nickName": "Anonymous User",
    "avatarUrl": "/0AS27120009wz6aovB7AA.png",
    "headPictureUrl": "http://ak-d.tripcdn.com/images/0AS27120009wz6aovB7AA_C_130_130_Q70.png",
    "regionName": "",
    "regionCode": "",
    "commentCount": 41,
    "grade": {
        "grade": 3,
        "title": "",
        "desc": ""
    },
    "trace": "",
    "usefulCount": 0,
    "pictureCount": 0,
    "isSimilar": false,
    "similarUrl": "",
    "isAnonymous": true
},
"createDate": "2022-12-26 12:45:36",
"checkinDate": "2022-12-24 23:59:00",
"content": "A lovely functional room with a comfortable mattress and a nice shower. Nice, warm heat in the winter. Friendly staff and good location. Would stay again.",
"language": "en",
"source": 1,
"travelType": 70,
"travelTypeText": "Couples",
"rating": 5.0,
"ratingInfo": {
    "ratingAll": 5.0,
    "ratingLocation": 5.0,
    "ratingFacility": 5.0,
    "ratingService": 5.0,
    "ratingRoom": 5.0,
    "commentLevel": "Outstanding"
},
"recommend": true,
"imageList": [],
"imageCuttingsList": [],
"videoList": [],
"feedbackList": [
    {
        "type": 3,
        "createDate": "2022-12-27 10:14:26",
        "content": "感謝您對CitiGO的信任和喜歡，德國沐浴、日本牙膏、乳膠床墊、羽絨床品……在睡眠和沐浴方面，CitiGO始終嚴守高品質標準。我們會繼續努力，創造更多更好的入住體驗，期待您再次入住！",
        "imageCuttingsList": [],
        "translatedContent": "Thank you for your trust and love for CitiGO, German bathing, Japanese toothpaste, latex mattresses, feather bedding... In terms of sleeping and bathing, CitiGO always strictly adheres to high quality standards. We will continue to work hard to create more and better check-in experience, and look forward to your stay again!",
        "language": "zh"
    }
],
"usefulCount": 0,
"canMarkUseful": true,
"usefulUserList": [],
"roomName": "Double Room",
"roomID": 62906560,
"isPackage": false,
"isTripComment": true
},
```
- ratingAll
- ratingLocation
- ratingFacility
- ratingService
- ratingRoom
- commentLevel
- type of the reviewer: travelTypeList ("Business travelers", "Family", "Solo travelers", "Booked for others", "Couples", "Friends", "Other", )
- type of the room `roomList`: "Double Room", "Advanced large bed room", "Panoramic Double Room", "Superior Memory Foam Double Room", "2-bedroom Suite", "Multi-level Twin Room", "Special Queen Room", 

{"groupList": [{<review>}, {<review>}]}
- pageIndex should start from 1
- pageSize cannot exceed 50

Fields to save:
```csv
id
ratingAll
ratingLocation
ratingFacility
ratingService
ratingRoom
commentLevel
travelType
roomName
commentLevel
language
content
checkinDate
userId
nickName
usefulCount
pictureCount
grade
```