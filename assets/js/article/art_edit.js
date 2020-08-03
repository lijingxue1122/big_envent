$(function () {


    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)



    var Id = location.search.split('=')[1]

    console.log(Id);


    $.ajax({
        url: '/my/article/' + Id,
        success: function (res) {
            console.log(res);

            // 5.5 Id
            $("[name=Id]").val(res.data.Id);
            // 5.1 文章标题
            $("[name=title]").val(res.data.title);
            // 5.4 文章封面
            //   前后端分离开发，所以图片的路径要添加上基础路径
            $("#image").attr("src", 'http://ajax.frontend.itheima.net' + res.data.cover_img)
            // 5.3 文章内容
            setTimeout(function () {
                tinyMCE.activeEditor.setContent(res.data.content);
            }, 1000);
            // 5.2 文章分类
            initCate(res.data.cate_id)
        }
    })
    var state = '已发布'

    $('#btnSave').on('click', function () {
        state = '草稿'

    })


    $('#form-edit').on('submit', function (e) {

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
                editArticle(fd)

            })

        function editArticle(fd) {

            $.ajax({
                type: 'post',
                url: '/my/article/edit',
                data: fd,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.status !== 0) {
                        return layui.layer.msg('发布失败')
                    } else {
                        layui.layer.msg('发布成功')
                        location.href = '/article/art_list.html'

                        window.parent.$('#a1').click()
                    }


                }
            })

        }

    })

    // 渲染文章分类封装
    var form = layui.form;

    function initCate(cate_id) {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败！')
                }
                // 模板引擎，传递对象，使用的是属性；
                res.cate_id = cate_id;
                var htmlStr = template('tpl-cate', res)
                console.log(htmlStr)
                $('[name=cate_id]').html(htmlStr)
                // 重新渲染form，数据与页面同步
                form.render()
            }
        })
    }

})