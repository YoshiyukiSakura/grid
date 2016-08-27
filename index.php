<!DOCTYPE HTML>
<html>
<head>
<title>发票校验管理</title>
<meta charset="UTF-8">
<style type="text/css">
table, th, td { border: 1px solid black;text-align: center;}
table{border-collapse:collapse;margin: 10px}
td{width: 100px;}
button{border-radius:5px;}
#container,#searchbox,#layout{border: 1px solid black;}
.header{background-color: #33CCFF}
.field{background-color: #AAC6FF}
#layout{display: none;margin: 30px}
body .demo-class .layui-layer-title{background-color: #33CCFF ;border:1px solid black;}
body .demo-class .layui-layer-btn .layui-layer-btn1{background:#999;}
a{color:#000;text-decoration: none;}
</style>
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://kirisamenana.com/frontend/sliontek/layer.js"></script>
<script src="http://kirisamenana.com/frontend/sliontek/grid.js"></script>
<script type="text/javascript">
var layer,option,varjson,page,pagesize=5,grid;
$(document).ready(
function () {
	option = {
			  "field":key,
			  "key":key, //data:data,
			  "param":{"page":1,"pagesize":5},
			  "url":"./json.php",
			  "onClick": tdclick,
			  "replace":replace
			 }
	grid = $("#container").Grid(option);

	$("body").on("click","button",function(){
		//使用$('body').on()对动态元素生效
		switch(this.id){
			case "search":
			grid.setParam($("#query").serializeJson());
			grid.Grid(grid.opts);
			$('#query')[0].reset();
			break;

			case "reset":
			$('#query')[0].reset();
			break;

			default:
			$("#nameinput").val($("#MaterialsName"+this.id.replace("editor","")).text());
			$("#numberinput").val($("#MaterialsNumber"+this.id.replace("editor","")).text());
			$("#upperinput").val($("#SafeUpperLimit"+this.id.replace("editor","")).text());
			$("#lowerinput").val($("#SafeLowerLimit"+this.id.replace("editor","")).text());
			//layout();
			break;
		}
	});
}
);
function layout(){
	layer.open({
			skin: 'demo-class',
		    type: 1,
		    area: ['500px', '300px'],
		    title:"安全库存定义",
		    btn:["确定","取消"],
		    closeBtn :false,
		    yes:yes,
		    shadeClose: true, //点击遮罩关闭
		    content: $('#layout')
	});
}
function yes (){
	$.ajax({
		url  : "SafeMaterialsStorage.php",
		type : 'post',
		data : $("#update").serialize(),
		success:layer.closeAll()
	});
	//layer.closeAll();
}
var replace = function(value){
    	switch(value){
    		case "到货确认":
    		return "<button>到货确认</button>";
    		break;
    		case "发票查验":
    		return "<button>发票查验</button>";
    		break;
    		default:
    		return value;
    		break;
    	}
    };
function tdclick(){
	alert(this);
}
data = [   {"OrderNumber":1,
			"EngineerNumber":"1号工程",
			"MaterialsType":"工程类",
			"BuyDate":"2月30日",
			"DeleveryConfirm":"还没确定",
			"InvoiceCheck":"还没确定",
			"Modifiable":true}].reverse();
key = [
		{field:"OrderNumber",text:"采购订单编号"},
		{field:"EngineerNumber",text:"工程编号"},
		{field:"MaterialsType",text:"物料类型"},
		{field:"BuyDate",text:"采购日期"},
		{field:"DeleveryConfirm",text:"确认到货",replace:function(text){return '<button>'+text+'</button>';}},
		{field:"InvoiceCheck",text:"发票校验",replace:function(text){return '<button>'+text+'</button>';}}
	  ]
</script>
</head>
<body>
	<div id="searchbox">
		<div class="header">查询</div>
		<form name="query" id="query" method="post" action="">
			<label for="OrderNumber">订单编号</label>
			<input type="text" id="OrderNumber" name="OrderNumber">
			<label for="EngineerNumber">工程编号</label>
			<input type="text" id="EngineerNumber" name="EngineerNumber"><br/>
			<label for="FormDate">起始日期</label>
			<input type="date" id="FormDate" name="FormDate">
			<label for="ToDate">截止日期</label>
			<input type="date" id="ToDate" name="ToDate">
			<input type="hidden" name="page" value="1"/>
			<input type="hidden" name="pagesize" value="5"/>
		</form>
	</div>
	<button id="search">查询</button>
	<button id="reset" >重置</button>
<div id="container">
	<div class="header">数据表单</div>
	<table >
		<tbody >
			<!--<tr id="field" class="field">
				<td>物料号</td>
				<td>物料名称</td>
				<td>物料类型</td>
				<td>安全上限</td>
				<td>安全下限</td>
				<td>当前库存</td>
				<td>操作</td>
			</tr>-->
		</tbody>
	</table>
	<div id="pager" style="text-align: center;">
		<button id="former">上一页</button>
		<span>
			当前页码
			<span id="page">1</span>
			/
			<span id="total"></span>
			页
		</span>
		<button id="latter">下一页</button>
	</div>
</div>
	<div id="layout">
	<div class="field">明细</div>
	<form name="update" id="update" action="" method="post">
	<label>
	物料名称 <input type="text" name="name" id="nameinput">
	</label><br/>
	<label>
	物料编号 <input type="text" name="number" id="numberinput">
	</label><br/>
	<label>
	安全上限 <input type="text" name="upperinput" id="upperinput">
	</label><br/>
	<label>
	安全下限 <input type="text" name="lowerinput" id="lowerinput">
	</label>
	</form>
</div>
</body>
</html>
