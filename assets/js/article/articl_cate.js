$(function () {

    initArtCateList()
    //文章数据渲染
    function initArtCateList() {

        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-table', res)
                $('tbody').html(str)
            }
        })
    }

    //添加文章的弹出层
    $("#btnAddCates").on('click', function () {

        index = layer.open({
            type: 1,
            area: ['500px', ' 250px'],
            title: '添加类别',
            content: $('#dialog-add').html()
        });



    })

    //添加文章
    var index = null

    $('body').on('submit', '#form_add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加失败')
                } else {
                    initArtCateList()
                    layui.layer.msg('添加成功')
                    layui.layer.close(index)
                }
            }
        })

    })


    //编辑部分
    var indexEdit = null

    $("tbody").on('click', '.btnEdit', function () {

        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加类别',
            content: $('#dialog-adit').html()
        });

        var Id = $(this).attr("data-id")
        console.log(Id);

        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                console.log(res);
                layui.form.val('form-edit', res.data)

            }
        })
    })

    // 修改数据渲染
    $('body').on('submit', '#form_adit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('更新分类失败')
                } else {
                    initArtCateList()
                    layui.layer.msg('更新分类数据成功')
                    layui.layer.close(indexEdit)
                }
            }
        })

    })

    //提示用户是否删除

    $('tbody').on('click', '.btn_dele', function () {

        var id = $(this).attr('data-id')

        layer.confirm('是否删除此条数据?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    } else {
                        layer.msg('删除成功')
                        layer.close(index);
                        initArtCateList()
                    }

                }
            })



        });



    })









})