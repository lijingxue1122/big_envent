//拦截/过滤 每次ajax请求，配置每次请求要的参数
//设置路径
var baseURl = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = baseURl + options.url

    // 2.包含‘/my/‘的请求统一带上请求头
    if (options.url.indexOf('/my') != -1) {
        options.headers = {

            Authorization: localStorage.getItem('token') || ''
        }

    }
    // 3.身份验证 
    options.complete = function (res) {

        var data = res.responseJSON
        console.log(data);
        console.log(data.status);
        console.log(data.message);

        if (data.status == 1 && data.message == "身份认证失败！") {

            localStorage.removeItem('token');
            location.href = '/login.html';
        }

    }

})