import React from 'react'

let array = []

for (let index = 0; index < 1000; index++) {
    let result = ''
    const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = 10
    let counter = 0
    while (counter < charactersLength) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    array.push(result)
}
console.dir(array)

const myWorker = new Worker('./src/worker.js')
myWorker.postMessage(array)

myWorker.onmessage = function () {
    console.log('Message received from worker')
}
function Home() {
    const runSort = async () => {}

    return (
        <>
            <button type="button" onClick={runSort}>
          Run Sort
            </button>
            <div></div>
            {array.map((x, i) => (
                <>
                    <span key={i}>{x}</span>
                    <br />
                </>
            ))}
        </>
    )
}

export default Home
