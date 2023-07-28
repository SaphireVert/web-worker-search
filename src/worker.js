onmessage = function(message) {
    let data = message.data
    let array = data.array
    let searchEspression = data.searchEspression
    // for (let index = 0; index < 10; index++) {
    //     console.log('message', data, index)
    //     postMessage(data)
    // }
    console.log('worker.js', array)
    let results = array.filter(x=>x.includes(searchEspression))
    postMessage(results)
}

