$(function () {

    getUserInfo()
    var layer = layui.layer

    $('.btnLogout').on('click', function () {

        layer.confirm('您确定退出吗', {
            icon: 3,
            title: '退出提示',
        }, function (index) {
            layer.close(index)
            localStorage.removeItem('token')
            location.href = '/login.html'
        })


    })

})




function getUserInfo() {

    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取失败')
            }
            // 调用用户渲染函数
            renderuser(res.data)

        },

        // complete: function (res) {

        //     if (res.response.status === 1 || res.response.message === '身份验证失败')「

        //         localStorage.removeItem('token')
        //     location.href = '/login.html'

        // }
    })
}

function renderuser(user) {
    var uname = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp' + uname)

    if (user.user_pic !== null) {
        $('.layui-nav-img ').show().attr('src', user.user_pic)
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text-avatar').show().html(uname[0].toUpperCase())
    }
}