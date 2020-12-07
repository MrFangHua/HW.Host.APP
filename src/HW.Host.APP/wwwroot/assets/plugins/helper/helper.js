$(function () {
    $.fn.extend({
        /*
        cols：表头列名
        data：数据
        opt：是否带操作列，如果带，填写操作，如果不带，null 或者 false
        */
        table: function (cols, data, opt) {
            //自动生成表格
            var tb = $(this);
            //清楚表格原来的内容
            tb.empty();
            //生成表格的列头
            if (cols != undefined) {
                var tr = $("<tr/>");
                //遍历对象
                for (var key in cols) {
                    var th = $("<th/>").text(cols[key]);
                    tr.append(th);
                }
                //判断是否有操作列
                if (opt != undefined && opt != false) {
                    var th = $("<th/>").text("操作");
                }
                tb.append(tr);
            }
            //生成数据
            if (data != undefined) {
                //data传过来的是个数组
                $.each(data, function (index, obj) {
                    for (var key in cols) {
                        var td = $("<td/>").text(obj[key]);
                        tr.append(td);
                    }
                    //判断是否有操作列
                    if (opt != undefined && opt != false) {
                        var td = $("<td/>");
                        //根据传过来的opt数组，遍历添加
                        for (var key in opt) {
                            //默认标签
                            // var btn = $("<a href = 'javascript:;'/>");
                            // //判断html是否为标签
                            // var begin = opt[key].html.indexOf("<");
                            // var end = opt[key].html.indexOf(">");
                            // if (opt[key].html != undefined && begin >= 0 && end > begin) {
                            //     //传进来的是一个html标签
                            //     btn = $(opt[key].html);
                            // } else {
                            //     btn.text(opt[key].html);
                            // }
                            btn = $(opt[key]);
                            //空格隔开
                            btn.text(btn.text() + " ");
                            (function () {
                                //先取出回调
                                var fun = opt[key].callback;
                                //给按钮添加一个事件
                                btn.click(function () {
                                    fun(obj)
                                });
                            })();
                            btn.appendTo(td);
                        }
                        tr.append(td);
                    }
                    tb.append(tr);
                });
            }
        }
        ,
        /*
        index：当前页
        size：页条数
        count：总页面
        callback 回调方法
        */
        page: function (index, size, count, callback) {
            var _p = $(this);
            //清空原来的
            _p.empty();
            //分页数据由两部分组成
            pageall = Math.ceil(count / size);
            //显示分页数据
            var info = $("<span/>");
            info.text("共" + count + "条数据 第" + index + "页/共" + pageall + "页");
            _p.append(info);
            //分页按钮，默认四个
            var btn1 = $("<a href='javascript:;'>首页</a>");
            var btn2 = $("<a href='javascript:;'>上一页</a>");
            var btn3 = $("<a href='javascript:;'>下一页</a>");
            var btn4 = $("<a href='javascript:;'>尾页</a>");
            //给按钮添加时间
            btn1.click(function () {
                callback(1);
            });
            btn2.click(function () {
                index = index - 1 < 1 ? 1 : index--;
                callback(index);
            });
            btn3.click(function () {
                index = index + 1 > pageall ? pageall : index++;
                callback(index);
            });
            btn4.click(function () {
                index = pageall;
                callback(index);
            });
            _p.append(btn1).append(btn2).append(btn3).append(btn4);
        }
    })
})