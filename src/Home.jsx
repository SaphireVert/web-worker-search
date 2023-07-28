import React from 'react'

const myWorker = new Worker('./src/worker.js')
myWorker.onmessage = function() {
    console.log('Message received from worker')
}
function Home() {
    
    const runSort = async () => {
        myWorker.postMessage([5, 7])

    }

    return (
        <button type="button" onClick={runSort}>
      Run Sort
        </button>
    )
}

export default Home
