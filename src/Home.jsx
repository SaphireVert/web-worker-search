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

// // const myBufs = new TextEncoder().encode(JSON.stringify(array)) 
// // console.log(typeof myBuf)
// var str = JSON.stringify(array)
// str = 'tototutu'
// var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
// // var bufView = new Uint16Array(buf)
// for (var i = 0, strLen = str.length; i < strLen; i++) {
//     buf[i] = str.charCodeAt(i)
// }

// console.log(typeof buf)
// console.log(String.fromCharCode.apply(null, new Uint16Array(buf)))
// // console.log(buf.map((x) => String.fromCharCode(x)))
// console.log(String.fromCharCode(116))

// // var bufView = new Uint16Array(buf)
// const bufView = new Int16Array(buf)
// var bufString = bufView.map(x=>x)
// console.log(String.fromCharCode.apply(null, bufView))
// // console.log(buf[0])






const myWorker = new Worker('./src/worker.js')
myWorker.postMessage(array)

// myWorker.postMessage(arrBuff, [arrBuff])
function Home() {
    const [values, setValues] = useState(['values'])
    myWorker.onmessage = function (e) {
        console.log('Message received from worker: ', e.data)
        console.log(e.data)
        setValues(e.data)
    }
    const runSort = async () => {}
    return (
        <>
            <input
                type="text"
                onChange={async (x) => {
                    myWorker.postMessage(x.target.value)
                }
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
