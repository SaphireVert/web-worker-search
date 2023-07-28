onmessage = function(message) {
    console.log('message', message.data)
}
postMessage('Never gonna see this message')

