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
        if (msg.data.type === 'array') {
            callback(msg.data.data)
        } else {
            this.worker.terminate()
        }
    })

    constructor(file){
        this.file = file
    }
}
async function doAll(callback, str, arr){
    workerNest.terminateWorker()
    let concatened = {
        query:str,
        array:JSON.stringify(arr)
    }
    concatened = JSON.stringify(concatened)
    let arrBuff = str2ab(concatened)
    workerNest.createWorker('./filter.js')
    workerNest.addEventListener(callback)
    workerNest.postMessage(arrBuff, [arrBuff])
}

const workerNest = new WorkingClass('./filter.js')

async function callWorker(str, arr, callback) {
    
    doAll(callback, str, arr)
    
}


console.log('en dehors de tout ça')
// callWorker('str', (e) => postMessage(ab2str(e.data)))




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

// function ab2str(buf) {
//     console.time()
//     const results = String.fromCharCode(...(new Uint16Array(buf)))
//     console.log('trad---------------', new Uint16Array(buf).toString())
//     console.timeEnd()
//     return results
// }



onmessage = function (msg) {
    let data = msg.data
    if(typeof data !== 'string'){
        array = data
        callWorker('', msg.data, (data) => this.postMessage(data))
    } else {
        callWorker(msg.data, array, (data) => this.postMessage(data))
    }

}



