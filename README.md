## Install
`npm init -y`
`npm i pupetteer`
`npm i -D @types/puppeteer @types/node puppeteer-debug typescript tslint ts-node`

# Generation
```sh
vm@lalux ~> RHVoice-test -p vitaliy -i /home/vm/Documents/dharam/report/20231123.txt -o a.mp3
vm@lalux ~> RHVoice-test -p elena -i /home/vm/Documents/dharam/report/20231123-2.txt -o b.mp3
ffmpeg -loop 1 -i '/home/vm/Pictures/Screenshots/Screenshot from 2023-11-23 09-54-21.png' -i '/home/vm/b.mp3' -c:v libx264 -tune stillimage -c:a aac -b:a 64k -pix_fmt yuv420p -shortest report_20231123_2.mp4

ffmpeg -loop 1 -i '/home/vm/Downloads/pig1.png' -i '/home/vm/a.mp3' -c:v libx264 -tune stillimage -c:a aac -b:a 64k -pix_fmt yuv420p -shortest male.mp4
ffmpeg -loop 1 -i '/home/vm/Downloads/image.png' -i '/home/vm/b.mp3' -c:v libx264 -tune stillimage -c:a aac -b:a 64k -pix_fmt yuv420p -shortest female.mp4

```
Type Error: Cannot convert a Symbol value to a string #3381

(global as any)['__Zone_disable_EventEmitter'] = true; 

## Test on https://bot.sannysoft.com
```js
const puppeteer = require("puppeteer-extra") 
const StealthPlugin = require("puppeteer-extra-plugin-stealth") 
puppeteer.use(StealthPlugin())
```

TimeoutError: Navigation timeout of 30000 ms exceeded
- https://chromedevtools.github.io/devtools-protocol/tot/Network/#method-getResponseBody
- https://jsoverson.medium.com/using-chrome-devtools-protocol-with-puppeteer-737a1300bac0

## List
- https://www.trip.com/hotels/detail/?hotelId=88620731
- https://www.trip.com/hotels/detail/?hotelId=97345363
- https://www.trip.com/hotels/detail/?hotelId=1194420
- https://www.trip.com/hotels/detail/?hotelId=106119817
- https://www.trip.com/hotels/detail/?hotelId=1816428
- https://www.trip.com/hotels/detail/?hotelId=65358839
