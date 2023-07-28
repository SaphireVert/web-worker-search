onmessage = function(message) {
    
    for (let index = 0; index < 10; index++) {
        console.log('message', message.data, index)
        postMessage(message.data)
    }
}

