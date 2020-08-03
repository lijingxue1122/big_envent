$(function () {
    initCate()

    initEditor()
    //加载文章分类
    function initCate() {

        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取失败')
                } else {

                    var str = template('tpl-cate', res)

                    $('[name=cate_id]').html(str)

                    layui.form.render()

                }
            }
        })


    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })


    $('#coverFile').on('change', function (e) {

        var files = e.target.files

        if (files.length === 0) {
            return layui.layer.msg('请选择封面图片')
        }

        var newImgURL = URL.createObjectURL(files[0])


        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域



    })


    var state = '已发布'

    $('#btnSave').on('click', function () {
        state = '草稿'

    })


    $('#form-pub').on('submit', function (e) {

        e.preventDefault()
        var fd = new FormData(this)

        fd.append('state', state);

        // console.log(...fd);

        //生成二进制图片
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                fd.append('cover_img', blob);
                console.log(...fd);
                //生成文件是好事操作，发送ajax异步操作
                publishArticle(fd)

            })

        function publishArticle(fd) {

            $.ajax({
                type: 'post',
                url: '/my/article/add',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('发布失败')
                    } else {
                        layui.layer.msg('发布成功')
                        location.href = '/article/art_list.html'


                    }


                }
            })

        }





    })



})