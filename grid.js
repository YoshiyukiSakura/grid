//rely on jQuery
'use strict';
(function ($) {
$.fn.Grid = function (option) {
	//Merge the contents of two or more objects together into the first object.
	this.opts = $.extend({}, $.fn.Grid.defaults, option);
	this.setParam = function(param){
		this.opts.param = $.extend(true, {}, this.opts.param, param);
	}
	this.pager = function (current, total) {
	    var first = "<a href=\"#\" class=\"pager\" id=\"first\">首页　</a>",
	    	prev = current*1-1,
	    	next = current*1+1,
	    	currentPage = "<span style=\"font-weight: bold\"id=\"page\">"+current+"　</span>",
	    	last = "<a href=\"#\" class=\"pager\" id=\"last\">　尾页</a>";
    	if (current=="1") {prev = 1};
    	if (current==total) {next = total};
	    $("#pager").empty();
	    $(first).appendTo($("#pager"));
	    $("<a href=\"#\" class=\"pager\" id=\""+prev+"\">上一页　</a>").appendTo($("#pager"));//上一页按钮
	    for (var minus=5; minus>0; minus--) //当前开始的前五页pager
    	{if(current*1-minus>0)
			{$("<a href=\"#\" class=\"pager\" id=\""+(current*1-minus)+"\">"+(current*1-minus)+"　</a>").appendTo($("#pager"));}
		}
	    $(currentPage).appendTo($("#pager"));
	    for (var plus=1;  plus<6;  plus++) //当前开始的后五页pager
    	{	if(current*1+plus<=total)
    		{$("<a href=\"#\" class=\"pager\" id=\""+(current*1+plus)+"\">"+(current*1+plus)+"　</a>").appendTo($("#pager"));}
		}
		$("<a href=\"#\" class=\"pager\" id=\""+next+"\">　下一页</a>").appendTo($("#pager"));//下一页
		$(last).appendTo($("#pager"));
		return this;
		function makeNumberPagers(current){
			var plusOne = "<a href=\"#\" class=\"pager\" id=\""+(current*1+1)+"\">"+(current*1+1)+"</a>";
		}
	}
	this.changePage = function(target){
		switch(target){
			case "first":
			this.opts.param.page = 1;
			break;
			case "last":
			this.opts.param.page = this.opts.totalpage;
			break;
			default:
			this.opts.param.page = target;
			break;
		}
		this.Grid(this.opts);
		return this;
	}
	this.pagedown = function(){
		if (this.opts.param.page==this.opts.totalpage) {$("#latter").hide();return this;};
		this.opts.param.page++;
		this.Grid(this.opts);//俺もよくわからん,window.optionはこれについで変化する
		return this;
	};
	this.pageup   = function(){
		if (this.opts.param.page=="1") {$("#former").hide();return this;};
		this.opts.param.page--;
		this.Grid(this.opts);
		return this;
	};
	this.loadData = function (url){
		var thisGrid = this;//catch current grid object for in $.ajax() 'this' will be other
		var xhr=$.ajax(url,
					{
						"async" : false,
						"method" : "post",
					    "data" : thisGrid.opts.param,
					    "dataType" : "json",
					    "success" : function(data){
					    	thisGrid.opts.dataArr = data.data;
					    	thisGrid.opts.totalpage = data.page;
					    }
					});
		return xhr;
	}
	if (this.opts.data){this.opts.dataArr = option.data}
	if (this.opts.url) {this.loadData(option.url);}
	if (typeof(this.opts.replace)=="function") {replace=option.replace};
	this.popularfield = function(){
		//遍历字段，为表格填充中文字段内容，一般在首行
		for(var offset in this.opts.field)
		{$("#field").append("<td>"+this.opts.field[offset]+"</td>");}
		return this.opts.field;
	};
	this.popularcontent = function(){
			//you may do this in a OOP way but I prefer my way
			//填充数据行
		for(var offset in this.opts.dataArr)
			{
				$("#field").after("<tr class=\"grid-content\" id=\"line"+offset+"\"></tr>");
				var thisline = $("#line"+offset);
					for (var key in this.opts.field) {
						if (key==this.opts.id)//默认使用传入的一个字段的值作为其他字段的ID(未实现)
							{var tempID = this.opts.dataArr[offset][key]};
						//检查是否有需要替换的节点内容
						if (this.opts.replace) {
							this.opts.dataArr[offset][key]=this.opts.replace(this.opts.dataArr[offset][key]);
						};
						thisline.append("<td id=\""+this.opts.field[key]+tempID+"\">"+this.opts.dataArr[offset][key]+"</td>");
					}
			}

	};
	//清空当前元素以承载Grid及其数据
	this.empty();
	this.append("<tr id=\"field\"></tr>")
	this.popularfield();
	this.popularcontent();
	this.append("<div id=\"pager\" style=\"text-align: center;\">");
	this.pager(this.opts.param.page, this.opts.totalpage);
	//为未来元素绑定事件和响应动作
	$("a.pager",this).click(function(){grid.changePage(this.id)});
	if (typeof(this.opts.onClick)=="function") {$("td",this).click(this.opts.onClick);};
	return this;

}
$.fn.Grid.defaults = {
	field:{key:"notice"},
	id:"id",
	dataArr:[{key:"your have passed nothing,data or url"}],//use a json object or not
	url:false,//use ajax to get data from server or not
	param:{"page":1,"pagesize":5},//if send param with ajax
	replace:false,//function,if replace some data or format it
	onClick:false,//call back
	onMouse:false//call back
}
$.fn.Grid.setDefaults = function (userDefault){
	return $.fn.Grid.defaults=$.extend(true,{},$.fn.Grid.defaults,userDefault);
}
})(jQuery);

var uniqueID = (function() {
	    var id = 0;
	    return function() { return id++; };
	})();

(function($){  
        $.fn.serializeJson=function(){//I copied this from wherever only god know it
            var serializeObj={};  
            $(this.serializeArray()).each(function(){  
                serializeObj[this.name]=this.value;  
            });  
            return serializeObj;  
        };  
    })(jQuery);  
