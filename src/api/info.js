import service from "../utils/request"
/**
 *
 * 登录接口
 */
export function infoList(data) {
    return service.request({
        url:"/login/",
        method:"post",
        data,//请求为post时
        //params:data//请求为get时
    })
}
/**
 *
 * 登录接口
 */
export function infoDetailed(data) {
    return service.request({
        url:"/login/",
        method:"post",
        data,//请求为post时
        //params:data//请求为get时
    })
}