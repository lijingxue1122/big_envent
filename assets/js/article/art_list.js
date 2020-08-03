$(function () {

    var p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: ""
    }
    initTable()

    //初始化表格数据
    function initTable() {

        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layui.layer.msg('获取失败')
                } else {
                    var str = template('tpl-table', res)

                    $('tbody').html(str)

                    renderPage(res.total)

                }
            }
        })
    }

    //初始化分类数据
    initCate()

    function initCate() {

        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            data: p,
            success: function (res) {

                if (res.status !== 0) {
                    return layui.layer.msg('获取分类失败')
                } else {
                    var str = template('tpl-cate', res)

                    $('[name=cate_id]').html(str)
                    layui.form.render()

                }
            }
        })
    }

    //为筛选表单绑定submit事件
    $('#form-search').on('submit', function (e) {

        e.preventDefault()

        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()

        console.log(cate_id);


        p.cate_id = cate_id
        p.state = state

        initTable()


    })



    function renderPage(total) {


        layui.laypage.render({

            elem: 'pageBox',
            count: total,
            limit: p.pagesize,
            curr: p.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {

                p.pagenum = obj.curr
                p.pagesize = obj.limit

                if (!first) {

                    initTable()
                }
            }



        })




    }


    $('tbody').on('click', '.btn-delet', function () {

        var id = $(this).attr('data-id')

        var len = $('.btn-delet').length

        layer.confirm('确定删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {

                    if (res.status !== 0) {
                        return layui.layer.msg('删失败')
                    } else {

                        layer.msg('删除成功')

                        if (len = 1 && p.pagenum > 1) {

                            p.pagenum--
                        }

                        initTable()



                    }

                }
            })


        });




    })





})