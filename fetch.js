module.exports = {
    fetcher: async (body)=>{

    }
}

global.t = 1
setInterval(function () {
    console.log(global.t)
    global.t++
}, 1000)