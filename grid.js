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
	    var prev, next;
	    $("#pager").empty();
	    prev = "<a href=\"#\" id=\"former\">上一页</a>";
	    next = "<a href=\"#\" id=\"latter\">下一页</a>";
	    if (this.opts.param.page=="1") {prev=""};
	    if (this.opts.param.page==this.opts.totalpage) {next="";};
	    $(prev).appendTo($("#pager"));
		$("#pager").append("<span><a href=\"#\" id=\"page\">"+current+"</a>/<span id=\"total\">共"+total+"</span>页</span>");
		$(next).appendTo($("#pager"));
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
	if (typeof(this.opts.onClick)=="function") {$(this).on("click","td",this.opts.onClick);};
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
						if (key=='id')//默认使用传入的一个字段的值作为其他字段的ID
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
	$("#former",this).click(function(){grid.pageup()  });
	$("#latter",this).click(function(){grid.pagedown()});
    return this.css({ fontWeight: "bold" });

}
$.fn.Grid.defaults = {
	field:{key:"notice"},
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
