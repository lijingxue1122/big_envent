$(function () {

    var form = layui.form;

    form.verify({

        nickname: function (value) {
            if (value.length > 6) {
                return '昵称应该输入1-6位之间！'
            }
        }
    });

    // 2.初始化用户信息

    initUserInfo()

    function initUserInfo() {

        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {

                    return layui.layer.msg(res.message)
                }


                form.val('formUserInfo', res.data)
            }
        })


    }
    $('#btnReset').on('click', function (e) {

        e.preventDefault()
        initUserInfo()

    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新失败')
                } else {
                    layui.layer.msg('修改成功')

                    // 子页面调用父页面的函数
                    window.parent.getUserInfo()
                }

            }
        })

    })


})