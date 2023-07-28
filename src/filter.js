function encode(str) {
    console.time()
    var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
    var bufView = new Uint16Array(buf)
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    console.timeEnd()
    return buf
}

function decode(buf) {
    console.time()
    const results = String.fromCharCode(...(new Uint16Array(buf)))
    console.timeEnd()
    return results
}




const bubleSort = input => {
    let swap
    let n = input.length - 1
    const sortedArray = input.slice()
    do {
        swap = false
        for (let index = 0; index < n; index += 1) {
            if (sortedArray[index] > sortedArray[index + 1]) {
                const tmp = sortedArray[index]
                sortedArray[index] = sortedArray[index + 1]
                sortedArray[index + 1] = tmp
                swap = true
            }
        }
        n -= 1
    } while (swap)

    return sortedArray
}

function test(){
    const numbers = [...Array(50000)].map(() =>
        Math.floor(Math.random() * 1000000)
    )
    bubleSort(numbers)
    console.log()
}



self.onmessage = function handleMessageFromMain(msg) {
    console.log('message from main received in worker:', msg.data)

    const bufTransferredFromMain = msg.data
    let realArray = JSON.parse(decode(bufTransferredFromMain))

    console.log(realArray)
    let parsedArray = JSON.parse(realArray.array)
    // parsedArray = JSON.parse(realArray.array)
    console.log(parsedArray)
    console.log(realArray.query)
    let results = parsedArray.filter(x=>x.includes(realArray.query))
    console.log(results)
    // test()
    // send buf back to main and transfer the underlying ArrayBuffer
    postMessage({type: 'array', data: results})
    self.postMessage(bufTransferredFromMain, [bufTransferredFromMain])

}
