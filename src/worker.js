var list = []
// listen for main to transfer the buffer to myWorker
// self.onmessage = function handleMessageFromMain(msg) {
//     console.log('message from main received in worker:', msg)

//     const bufTransferredFromMain = msg.data

//     console.log(
//         'buf.byteLength in worker BEFORE transfer back to main:',
//         bufTransferredFromMain.byteLength,
//     )

//     // send buf back to main and transfer the underlying ArrayBuffer
//     self.postMessage(bufTransferredFromMain, [bufTransferredFromMain])

//     console.log(
//         'buf.byteLength in worker AFTER transfer back to main:',
//         bufTransferredFromMain.byteLength,
//     )
// }


onmessage = function (msg) {
    let data = msg.data
    if(typeof data !== 'string'){
        console.log('not String')
        list = data
    } else {
        console.log('it is a string')
        console.log(list)
        console.log(data)
        const filteredList = list.filter(x=>x.includes(data))
        postMessage(filteredList)
    }
}
