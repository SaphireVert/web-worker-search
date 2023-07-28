var list = []
var isFree = true

function callWorker(str, callback) {
    console.log('enter in callWorker function')
    let arrBuff = str2ab(str)
    const myWorker = new Worker('./filter.js')
    
    // listen for myWorker to transfer the buffer back to main
    myWorker.addEventListener('message', (msg) => {
        callback(msg)
        myWorker.terminate()
    })

    const terminate = () => {
        myWorker.terminate()
    }
    
    // send Buffer to myWorker and transfer the underlying ArrayBuffer
    myWorker.postMessage(arrBuff, [arrBuff])
}

callWorker('str', (e) => postMessage(ab2str(e.data)))




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
    console.log(data)
    if(typeof data !== 'string'){
        console.log('not String')
        list = data
    } else {
        callWorker(msg.data, (e) => postMessage(ab2str(e.data)))
    }
    console.time()
    console.timeEnd()

}



