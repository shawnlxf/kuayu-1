/*
const request = new XMLHttpRequest()
request.open('GET', 'http://qq.com:8888/friends.json')
// request.open('GET', 'https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/js/lib/jquery-1-edb203c114.10.2.js')
request.onreadystatechange = () => {
    console.log(request.readyState)
    console.log(request.status)
    if (request.readyState === 4 && request.status === 200) {
        console.log(request.response)
    }
}

request.send()
*/


function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = 'shawnJSONPCallbackName' + Math.random()

        // 回调函数，qq.com 下的 friends.js 调用
        // window.xxx = (data) => {
        window[random] = (data) => {
            resolve(data)
        }
        const script = document.createElement('script')
        script.src = `${url}?callback=${random}`
        script.onload = () => {
            script.remove()
        }
        /*
        script.onload = () => {
            console.log(window.xxx)
        }
        */
        script.onerror = () => {
            reject()
        }

        document.body.appendChild(script)
    })
}

jsonp('http://qq.com:8888/friends.js')
    .then((data) => {
        console.log(data)
    })





