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
	    var first = "<a href=\"#\" class=\"pager\" id=\"first\">首页　</a>",
	    	prev = current*1-1,
	    	next = current*1+1,
	    	currentPage = "<span style=\"font-weight: bold\"id=\"page\">"+current+"　</span>",
	    	last = "<a href=\"#\" class=\"pager\" id=\"last\">　尾页</a>";
    	if (current=="1") {prev = 1};
    	if (current==total) {next = total};
	    $("#"+self.pagerId, self).empty();
	    $(first).appendTo($("#"+self.pagerId, self));
	    $("<a href=\"#\" class=\"pager\" id=\""+prev+"\">上一页　</a>").appendTo($("#"+self.pagerId, self));//上一页按钮
	    if(self.opts.former5pages==true){
		    for (var minus=5; minus>0; minus--) //当前开始的前五页pager
	    	{if(current*1-minus>0)
				{$("<a href=\"#\" class=\"pager\" id=\""+(current*1-minus)+"\">"+(current*1-minus)+"　</a>").appendTo($("#"+self.pagerId, self));}
			}
		}
	    $(currentPage).appendTo($("#"+self.pagerId, self));//当前页不可点击
	    for (var plus=1;  plus<6;  plus++) //当前开始的后五页pager
    	{	if(current*1+plus<=total)
    		{$("<a href=\"#\" class=\"pager\" id=\""+(current*1+plus)+"\">"+(current*1+plus)+"　</a>").appendTo($("#"+self.pagerId, self));}
		}
		$("<a href=\"#\" class=\"pager\" id=\""+next+"\">　下一页</a>").appendTo($("#"+self.pagerId, self));//下一页
		$(last).appendTo($("#"+self.pagerId, self));
		return self;
	}
	self.changePage = function(target){
		switch(target){
			case "first":
			self.opts.param.page = 1;
			break;
			case "last":
			self.opts.param.page = self.opts.totalpage;
			break;
			default:
			self.opts.param.page = target;
			break;
		}
		return self.Grid(self.opts);
	}
	self.loadData = function (url){
		var xhr=$.ajax(url,
					{
						"async" : false,
						"method" : "post",
					    "data" : self.opts.param,
					    "dataType" : "json",
					    "success" : function(data){
					    	self.opts.dataArr = data.data;
					    	self.opts.totalpage = data.page;
					    }
					});
		return xhr;
	}
	if (self.opts.json){self.opts.dataArr = option.json.dataArr}//传入data时暂无翻页功能
	if (self.opts.url) {self.loadData(option.url);}
	self.popularfield = function(){
		//遍历字段，为表格填充中文字段内容，一般在首行
		for(var offset in self.opts.field)
		{
			$("#field",self).append("<td calss=\"field\" id=\""+offset+"\">"+self.opts.field[offset].text+"</td>");

		}
		self.pagerId = Math.random()*100000000000000000;
		$("#field",self).after("<tr><td colspan="+Object.keys(self.opts.field).length+" id=\""+self.pagerId+"\" style=\"text-align: center;\"></td><tr>");
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
				$("#field",self).after("<tr class=\"grid-content\" id=\"line"+lineid+"\"></tr>");
				thisline = $("#line"+lineid,self);
					for ( offset in self.opts.field) {
						Field = self.opts.field[offset];//当前字段对象
						//检查是否有需要替换的节点内容
						if (typeof(Field.replace)=="function") {
							Data[Field.field]=Field.replace(Data[Field.field]);
						};
						thisline.append("<td class=\""+Field.field+"\" id=\""+Field.field+lineid+"\">"+Data[Field.field]+"</td>");
					}
			}
	}
	self.beautyfy = function(){
		self.find("tr:odd").addClass("oddRow");
	}
	function FieldOnClick (Grid){
		console.log("self.onClick")
		console.log(self)
	}
	//清空当前元素以承载Grid及其数据
	self.empty();
	self.append("<table><tr id=\"field\"></tr></table>");
	self.popularfield();
	self.popularcontent();
	self.append();
	self.constructpager(self.opts.param.page, self.opts.totalpage);
	self.beautyfy();
	//为未来元素绑定事件和响应动作
	$("a.pager",self).click(function(){self.changePage(this.id)});
	$("tr",     self).click(function(){console.log(this.id+"onTrClick")})
	$("td",$("#field",self)).click(function(){console.log(self)});
	if (typeof(self.opts.onClickTd)=="function") {$("td",self).click(self.opts.onClickTd);};
	return self;
}
$.fn.Grid.defaults = {
	field:{key:"notice"},
	id:false,
	dataArr:[{key:"your have passed nothing,data or url"}],//use a json object or not
	url:false,//use ajax to get data from server or not
	param:{"page":1, "pagesize":5},//if send param with ajax
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
