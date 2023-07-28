var list = []
var isFree = true

function callWorker(str, callback) {
    console.log('enter in callWorker function')
    let arrBuff = str2ab(str)
    const myWorker = new Worker('./filter.js')
    
    // listen for myWorker to transfer the buffer back to main
    myWorker.addEventListener('message', (msg) => {
        callback(msg)
    })
    
    // send Buffer to myWorker and transfer the underlying ArrayBuffer
    myWorker.postMessage(arrBuff, [arrBuff])
}

callWorker('str')




function str2ab(str) {
    var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
    var bufView = new Uint16Array(buf)
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    return buf
}

function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint16Array(buf))
}



onmessage = function (msg) {
    let data = msg.data
    if(typeof data !== 'string'){
        console.log('not String')
        list = data
    } else {
        // const myFilterWorker = new Worker('filter.js')
        // myFilterWorker.postMessage('hello')
        // myFilterWorker.onmessage = function(e) {
        //     postMessage('e.data')
        // }
        callWorker('tot', (e) => postMessage(e.data))
        // myFilterWorker.terminate()
        // const filteredList = list.filter(x=>x.includes(data)).slice(0,10)
        // postMessage('filteredList')
    }
}



