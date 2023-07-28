var list = []
var isFree = true

class WorkingClass {
    createWorker = (workerParams) => this.worker = new Worker(workerParams)
    terminateWorker = ()=> {
        if (this.worker) {
            this.worker.terminate()
        }
    }
    postMessage = (arg1, arg2)=> this.worker.postMessage(arg1, arg2)
    addEventListener = (callback)=>this.worker.addEventListener('message', (msg) => {
        callback(msg)
        this.worker.terminate()
    })

    constructor(file){
        this.file = file
    }
}

const workerNest = new WorkingClass('./filter.js')

function callWorker(str, callback) {
    console.log('enter in callWorker function')
    let arrBuff = str2ab(str)
    workerNest.terminateWorker()
    workerNest.createWorker('./filter.js')
    workerNest.addEventListener(callback)
    workerNest.postMessage(arrBuff, [arrBuff])
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



