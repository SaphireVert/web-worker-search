var list = []

function callWorker() {
    const totoStr = 'totos'

    let arrBuff = str2ab(totoStr)
    const myWorker = new Worker('./filter.js')
    
    // listen for myWorker to transfer the buffer back to main
    myWorker.addEventListener('message', function handleMessageFromWorker(msg) {
        console.log('message from worker received in main:', msg)
    
        const bufTransferredBackFromWorker = msg.data
    
        console.log(
            'buf.byteLength in main AFTER transfer back from worker:',
            bufTransferredBackFromWorker.byteLength
        )
    })
    
    // create the buffer
    const myBuf = new ArrayBuffer(8)
    console.log(typeof myBuf)
    
    console.log(
        'buf.byteLength in main BEFORE transfer to worker:',
        myBuf.byteLength
    )
    
    // send myBuf to myWorker and transfer the underlying ArrayBuffer
    myWorker.postMessage(arrBuff, [arrBuff])
    
    console.log(
        'buf.byteLength in main AFTER transfer to worker:',
        myBuf.byteLength
    )
}

callWorker()




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
        const myFilterWorker = new Worker('filter.js')
        myFilterWorker.postMessage('hello')
        myFilterWorker.onmessage = function(e) {
            postMessage(e.data)
        }
        // myFilterWorker.terminate()
        // const filteredList = list.filter(x=>x.includes(data)).slice(0,10)
        // postMessage('filteredList')
    }
}



