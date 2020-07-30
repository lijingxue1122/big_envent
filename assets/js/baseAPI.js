//拦截/过滤 每次ajax请求，配置每次请求要的参数
//设置路径
var baseURl = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = baseURl + options.url
        .
    0


})