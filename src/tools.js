
export function str2ab(str) {
    console.time()
    var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
    var bufView = new Uint16Array(buf)
    for (var i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i)
    }
    console.timeEnd()
    return buf
}
export function ab2str(buf) {
    console.time()
    const results = String.fromCharCode(...(new Uint16Array(buf)))
    console.timeEnd()
    return results
}
