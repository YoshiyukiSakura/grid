//rely on jQuery
'use strict';
(function ($) {
    $.fn.Grid = function (option) {
        var self = this;
        //Merge the contents of two or more objects together into the first object.
        self.opts = $.extend({}, $.fn.Grid.defaults, option);

        self.setParam = function(param){
            self.opts.param = $.extend(true, {}, self.opts.param, param);
        }

        self.constructpager = function (current, total) {
            var first = '<span>首页</span>',
            prev = current*1-1,
	    	next = current*1+1,
	    	currentPage = '<span style="font-weight: bold" class="cur">'+current+'</span>',
	    	last = '<span>尾页</span>';
            if (current<2) {prev = 1};
            if (current==total) {next = total};
            $('#'+self.pagerId, self).empty();
            $(first).appendTo($('#'+self.pagerId, self));
            $('<span>上一页</span>').appendTo($('#' + self.pagerId, self));//上一页按钮
            if(self.opts.former5pages==true){
                for (var minus=5; minus>0; minus--) //当前开始的前五页pager
                {if(current*1-minus>0)
                { $('<span>' + (current * 1 - minus) + '</span>').appendTo($('#' + self.pagerId, self)); }
                }
            }
            $(currentPage).appendTo($('#'+self.pagerId, self));//当前页不可点击
            for (var plus=1;  plus<6;  plus++) //当前开始的后五页pager
            {	if(current*1+plus<=total)
            {
                $('<span>' + (current * 1 + plus) + '</span>').appendTo($('#' + self.pagerId, self));
            }
            }
            $('<span>...</span><span>' + total + '</span>').appendTo($('#' + self.pagerId, self));//最后页
            $('<span>下一页</span>').appendTo($('#' +self.pagerId, self));//下一页
            $(last).appendTo($('#'+self.pagerId, self));
            return self;
        }

        self.changePage = function (target) {
            //alert(target)
            switch (target) {
                case "...":
                    return false;
                case "首页":
                    self.opts.param.page = 1;
                    break;
                case "尾页":
                    self.opts.param.page = self.opts.totalpage;
                    break;
                case "上一页":
                    self.opts.param.page--;
                    break;
                case "下一页":
                    self.opts.param.page++;
                    break;
                default:
                    if (0 <= target*1 <= self.opts.totalpage) 
                    {
                        self.opts.param.page = target;
                        break;
                    }
                    break;
            }
            if (self.opts.param.page<1) {
                self.opts.param.page = 1;
            }
            if (self.opts.param.page > self.opts.totalpage) {
                self.opts.param.page = self.opts.totalpage;
            }
            return self.Grid(self.opts);
        }

        self.loadData = function (url){
            var xhr=$.ajax(url,
                        {
                            async    : false,
                            method   : "post",
                            data     : self.opts.param,
                            dataType : "json",
                            complete: function (xhr) {
                                var data = xhr.responseJSON
                                self.opts.dataArr = data.data;
                                self.opts.param.page = data.cur;
                                self.opts.totalpage = data.size;
                            },
                            error  : function(err){
                                console.log(err)

                            }
                        });
            return xhr;
        }

        self.popularfield = function(){
            //遍历字段，为表格填充中文字段内容，一般在首行
            for(var offset in self.opts.field)
            {
                $('#field',self).append('<th calss="field" id="'+offset+'">'+self.opts.field[offset].text+'</th>');

            }
            if (self.opts.pager == true) {
                self.pagerId = Math.floor(Math.random() * 999999);
                $('#field', self).after('<tr onselectstart="return false;"><td colspan=' + Object.keys(self.opts.field).length + ' id="' + self.pagerId + '" class="Page" style="text-align: center;"></td><tr>');
            }
            return self.opts.field;
        }

        self.popularcontent = function(){
            //填充数据行
            var offset, lineid,thisline,Data,Field;
            for( offset in self.opts.dataArr)
            {	
                Data = self.opts.dataArr[offset],//当前正在处理的数据
				lineid = offset;//用于ID赋值
                if (self.opts.id) {lineid = Data[self.opts.id]}//如果有,则使用指定字段的值作为ID
                $('#field',self).after('<tr class="grid-content" id="line'+lineid+'"></tr>');
                thisline = $('#line'+lineid,self);
					for ( offset in self.opts.field) {
                            Field = self.opts.field[offset];//当前字段对象
					    //检查是否有需要替换的节点内容
                            var content = Data[Field.field]
                if (typeof(Field.replace)=="function") {
                    content = Field.replace(Data[Field.field]);
            };
                thisline.append('<td class="' + Field.field + '" id="' + Field.field + lineid + '">' + content + '</td>');
        }
    }
}

	self.beautyfy = function(){
	    self.find('tr:odd').addClass('oddRow');
	}
if (self.opts.json) { self.opts.dataArr = option.json.dataArr }//传入data时暂无翻页功能
if (self.opts.url) { self.loadData(option.url); }

//清空当前元素以承载Grid及其数据
self.empty();
self.append('<table class="table"><tr id="field"></tr></table>');
self.popularfield();
self.popularcontent();
self.append();
if (self.opts.pager==true) {
    self.constructpager(self.opts.param.page, self.opts.totalpage);
}
self.beautyfy();
//为未来元素绑定事件和响应动作
$('.Page span', self).click(function () {  self.changePage($(this).text()) });
$('tr',     self).click(self.onClickTr);
$('td',$('.grid-conten',self)).click(self.onClickTd);
$('td',$('#field',self)).click(function(){alert(self)});
if (typeof(self.opts.onClickTd)=="function") {$('td',self).click(self.opts.onClickTd);};
return self;
}
$.fn.Grid.defaults = {
    field:{key:"notice"},
    id:false,
    dataArr:[{key:"your have passed nothing,data or url"}],//use a json object or not
    url:false,//use ajax to get data from server or not
    param: { "page": 1, "pagesize": 5 },//if send param with ajax
    pager:true,
    former5pages:false,
    replace:false,//function,if replace some data or format it
    events:false,
    onClick:false,//call back
    onMouseOverTr:false,
    onClickTr:false,
    onMouseOverTd:false,
    onClickTd:false,
    callback:false,
    onMouse:false//call back
}
$.fn.Grid.setDefaults = function (userDefault){
    return $.fn.Grid.defaults=$.extend(true,{},$.fn.Grid.defaults,userDefault);
}
})(jQuery);
(function($){  
    $.fn.serializeJson=function(){//I copied this from wherever only god know it
        var serializeObj={};  
        $(this.serializeArray()).each(function(){  
            serializeObj[this.name]=this.value;  
        });  
        return serializeObj;  
    };  
})(jQuery);  
