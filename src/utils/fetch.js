import {fetch as fetchPolyfill} from "whatwg-fetch"
import qs from "qs"

const get = (url)=>(
    fetchPolyfill(url, {
        method: "get",
        headers: {
            'Accept': 'application/json, text/plain, */*',
        },
        credentials: 'include'
    })
    .then(res=>res.json())
)

const post = (url, params)=>(
    fetchPolyfill(url, {
        method: "post",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        credentials: 'include',
        body: qs.stringify(params)
    })
    .then(res=>res.json())
)

export {
    get,
    post
}