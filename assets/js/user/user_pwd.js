$(function () {

    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        somePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新密码和原密码不能一致'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '与新密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改失败')
                } else {
                    layui.layer.msg('修改成功')
                    $('layui-form')[0].reset()

                }

            }
        })


    })





})