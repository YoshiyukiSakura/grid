//rely on jQuery
function grid (option={key:false,data:false,url:false,param:false}){
	if (option.key) {
		var key=option.key,
			field=[],
			json;
		//检查传入了data还是url
		if (option.url) {
			var xhr=$.ajax( option.url,{
					"async" : false,
					"method" : "post",
				    "data" : option.param,
				    "dataType" : "json",
				    "success" : function(data){json=data;}
					});
		}
		if (option.data){json = option.data}
	//清空表格以承载接下来的内容
	$("table").empty();
	$("table").append("<tr id=\"field\"></tr>");
	//构建字段行
	for(var t in key)
		{
			$("#field").append("<td>"+key[t]+"</td>");
			field.push(t);
		}
	//填充数据行
	for(var offset in json)
		{	
			$("#field").after("<tr id=\"line"+offset+"\"></tr>");
			var thisline = $("#line"+offset);
			for (var i = 0; i < field.length; i++) {
				if (i==0)//默认使用传入的一个字段的值作为其他字段的ID
					{var tempID = json[offset][field[i]]};
				if (field[i]=="Modifiable"||field[i]=="DeleveryConfirm"||field[i]=="InvoiceCheck")
					{json[offset][field[i]]="<button id=\""+field[i]+tempID+"\">编辑</button>"}
				thisline.append("<td id=\""+field[i]+tempID+"\">"+json[offset][field[i]]+"</td>");
			}
		}
	$("#pager").empty();
	$("#pager").append("<a href=\"#\" id=\"former\">上一页</a><span>当前页码<span id=\"page\">1</span>/<span id=\"total\"></span>页</span><a href=\"#\" id=\"latter\">下一页</a>");
	return true;
	};
	return false;
	//By Yoshiyuki(¯﹃¯) 1468894356
}
$(document).ready(function(){
$("body").on("click","a",function(){
				//使用on(event,selector,function)对动态元素生效
				switch(this.id){
					case "former":
					page = $("#page").text();
					if (page=="1") break;
					param = {"page":--page,"pagesize":pagesize};
					grid({"key":key, "url":"./json.php", "param":param});
					$("#page").text(page);
					break;

					case "latter":
					page = $("#page").text();
					param = {"page":++page,"pagesize":pagesize};
					grid({"key":key, "url":"./json.php", "param":param});
					$("#page").text(page);
					break;

					case "search":
					grid({"key":key, "url":"./json.php", "param":$("#query").serialize()});
					$('#query')[0].reset();
					break;

					case "reset":
					$('#query')[0].reset();
					break;

					default:
					break;
				}
			});
}
);