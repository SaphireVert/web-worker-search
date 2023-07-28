import React, { useState } from 'react'

let array = []

for (let index = 0; index < 10000; index++) {
    let result = ''
    const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < 10) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    array.push(result)
}

const myWorker = new Worker('./src/worker.js')

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

console.log(
    'buf.byteLength in main BEFORE transfer to worker:',
    myBuf.byteLength
)

// send myBuf to myWorker and transfer the underlying ArrayBuffer
myWorker.postMessage(myBuf, [myBuf])

console.log(
    'buf.byteLength in main AFTER transfer to worker:',
    myBuf.byteLength
)

function Home() {
    const [values, setValues] = useState(['values'])
    myWorker.onmessage = function (e) {
        console.log('Message received from worker', e.data)
        setValues(e.data)
    }
    const runSort = async () => {}
    return (
        <>
            <input
                type="text"
                onChange={() => {
                    // myWorker.postMessage('let\'s go', {
                    //     array: array,
                    //     searchEspression: x.target.value,
                    // })}
                    myWorker.postMessage('let\'s go', [myBuf])}
                }
            />
            <button type="button" onClick={runSort}>
          Run Sort
            </button>
            <div></div>
            {values
                ? values.map((x, i) => (
                    <>
                        <span key={i}>{x}</span>
                        <br />
                    </>
                ))
                : 'no value'}
        </>
    )
}

export default Home
