$(function () {

    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()

    })

    var form = layui.form;

    var layer = layui.layer

    form.verify({
        //密码校验证规则
        pwd: [/^[\S]{6,12}$/, "密码为6-12位，不能有空格"],

        repwd: function (value) {
            if ($('#reg-pwd').val() !== value) {
                return '输入密码不一致'
            }
        }


    });

    //注册
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();

        // console.log($(this).serialize());
        // username=ljx&password=123456&repassword=123456

        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val(),

            },
            success: function (res) {

                //注册失败校验
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg('注册成功')
                    $('#link-login').click()
                    $('#form_reg')[0].reset()
                }


            }
        })
    })
    //登陆
    $('#form_login').on('submit', function (e) {

        e.preventDefault()

        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    layer.msg(res.message)

                    localStorage.setItem('token', res.token)

                    location.href = "/index.html"
                }

            }
        })
    })

})