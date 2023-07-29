// function encode(str) {
//     console.time()
//     var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
//     var bufView = new Uint16Array(buf)
//     for (var i = 0, strLen = str.length; i < strLen; i++) {
//         bufView[i] = str.charCodeAt(i)
//     }
//     console.timeEnd()
//     return buf
// }



function decode(buf) {
    let results = ''
    const bufArr = new Uint16Array(buf)
    const gap = 10000
    const bigIterrations = Math.floor(bufArr.length/gap)
    const smallIterrations = bufArr.length % gap
    console.time()
    for (let index = 0; index < bigIterrations*gap ; index+=gap) {
        results += String.fromCharCode(...bufArr.slice(index, index+gap))
    }
    console.timeEnd()
    const startValue = bigIterrations * gap
    results += String.fromCharCode(...bufArr.slice(startValue, startValue+smallIterrations))

    return results
}

function toto (){
    console.log('udujedf')
}


self.onmessage = function handleMessageFromMain(msg) {

    let array = msg.data.array
    console.time()
    // let results = array.filter(async x => x.includes(msg.data.query)).splice(0,10)
    const results = array.filter(function(item) {
        if (this.count < 10 && item.includes(msg.data.query)) {
            this.count++
            return true
        }
        return false
    }, {count: 0})
    console.log(results)
    
    console.log('array[0]')
    
    console.timeEnd()
    console.log(results)

    // self.postMessage('finished')
    postMessage({type: 'array', data: results})

}


// self.onmessage = function handleMessageFromMain(msg) {

//     const bufTransferredFromMain = msg.data
//     let realArray = JSON.parse(decode(bufTransferredFromMain))

//     let parsedArray = JSON.parse(realArray.array)
//     // parsedArray = JSON.parse(realArray.array)
//     console.time()
//     let results = parsedArray.filter(x=>x.includes(realArray.query)).splice(0,10)
//     console.timeEnd()
//     console.log('oui c\'est passé', results)
//     // test()
//     // send buf back to main and transfer the underlying ArrayBuffer
//     postMessage({type: 'array', data: results})
//     self.postMessage(bufTransferredFromMain, [bufTransferredFromMain])

// }
