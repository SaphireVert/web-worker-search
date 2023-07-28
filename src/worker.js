var array = []

class WorkingClass {
    createWorker = (workerParams) => this.worker = new Worker(workerParams)
    terminateWorker = ()=> {
        if (this.worker) {
            this.worker.terminate()
        }
    }
    postMessage = (arg1, arg2)=> this.worker.postMessage(arg1, arg2)
    addEventListener = (callback)=>this.worker.addEventListener('message', (msg) => {
        console.log(msg.data)
        if (msg.data.type === 'array') {
            console.log(msg.data.data)
            callback(msg.data.data)
        } else {
            console.log(typeof msg.data)
            this.worker.terminate()
        }
    })

    constructor(file){
        this.file = file
    }
}

const workerNest = new WorkingClass('./filter.js')

function callWorker(str, arr, callback) {
    console.log('enter in callWorker function')
    console.log(str)
    console.log(arr)
    let concatened = {
        query:str,
        array:JSON.stringify(arr)
    }
    console.log(concatened)
    concatened = JSON.stringify(concatened)
    let arrBuff = str2ab(concatened)
    workerNest.terminateWorker()
    workerNest.createWorker('./filter.js')
    workerNest.addEventListener(callback)
    workerNest.postMessage(arrBuff, [arrBuff])
}

callWorker('str', (e) => postMessage(ab2str(e.data)))




function str2ab(str) {
    console.time()
    var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
    var bufView = new Uint16Array(buf)
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    console.timeEnd()
    return buf
}

function ab2str(buf) {
    console.time()
    const results = String.fromCharCode(...(new Uint16Array(buf)))
    console.timeEnd()
    return results
}



onmessage = function (msg) {
    let data = msg.data
    console.log(data)
    if(typeof data !== 'string'){
        console.log('not String')
        array = data
        callWorker('', msg.data, (data) => this.postMessage(data))
    } else {
        callWorker(msg.data, array, (data) => this.postMessage(data))
    }

}



