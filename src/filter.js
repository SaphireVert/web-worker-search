var isFree = true
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
    isFree = true
}



self.onmessage = function handleMessageFromMain(msg) {
    console.log('message from main received in worker:', msg.data)

    const bufTransferredFromMain = msg.data
    console.log(isFree)
    if (isFree) {
        isFree = false
        test()
    }
    // send buf back to main and transfer the underlying ArrayBuffer
    self.postMessage(bufTransferredFromMain, [bufTransferredFromMain])
}
