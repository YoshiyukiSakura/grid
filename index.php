<!doctype>
<html>
<head>
	<title>安全库存维护</title>
	<meta charset="UTF-8">
	<style type="text/css">
	table, th, td { border: 1px solid black;text-align: center;}
	table{border-collapse:collapse;margin: 10px}
	td{width: 100px;}
	button{border: 1px solid black;border-radius:5px;}
	a{padding: 2px;background-color: #F0F0F0 ;border: 1px solid black;border-radius:5px;}
	#container,#searchbox,#layout{border: 1px solid black;}
	.header{background-color: #33CCFF}
	.field{background-color: #AAC6FF}
	#layout{display: none;margin: 30px}
	body .demo-class .layui-layer-title{background-color: #33CCFF ;border:1px solid black;}
	body .demo-class .layui-layer-btn .layui-layer-btn1{background:#999;}
	</style>
	<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
	<script src="./layer.js"></script>
	<script src="./grid.js"></script>
	<script type="text/javascript">
	var layer,option,param,page,pagesize;
	$(document)
	.ready(
		function () {
			option = {"key":key, "data":data, "url":false};
			grid({"key":key, "url":"./json.php", param:{MaterialsName:"123"}});
			$("body").on("click","button",function(){
				//使用on(event,selector,function)对动态元素生效
				switch(this.id){
					default:
					$("#nameinput").val($("#MaterialsName"+this.id.replace("Modifiable","")).text());
					$("#numberinput").val($("#MaterialsNumber"+this.id.replace("Modifiable","")).text());
					$("#upperinput").val($("#SafeUpperLimit"+this.id.replace("Modifiable","")).text());
					$("#lowerinput").val($("#SafeLowerLimit"+this.id.replace("Modifiable","")).text());
					layout();
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
	data = [{"MaterialsNumber":1,
				"MaterialsName":"name",
				"MaterialsType":"type",
				"SafeUpperLimit":1000,
				"SafeLowerLimit":200,
				"CurrentStorage":888,
				"Modifiable":true},
				{"MaterialsNumber":2,
				"MaterialsName":"name",
				"MaterialsType":"type",
				"SafeUpperLimit":1000,
				"SafeLowerLimit":200,
				"CurrentStorage":888,
				"Modifiable":true},
				{"MaterialsNumber":3,
				"MaterialsName":"name",
				"MaterialsType":"type",
				"SafeUpperLimit":1000,
				"SafeLowerLimit":200,
				"CurrentStorage":888,
				"Modifiable":true},
				{"MaterialsNumber":4,
				"MaterialsName":"name",
				"MaterialsType":"type",
				"SafeUpperLimit":1000,
				"SafeLowerLimit":200,
				"CurrentStorage":888,
				"Modifiable":true},
				{"MaterialsNumber":5,
				"MaterialsName":"name",
				"MaterialsType":"type",
				"SafeUpperLimit":1000,
				"SafeLowerLimit":200,
				"CurrentStorage":888,
				"Modifiable":true}
				].reverse();
	key = {	"MaterialsNumber":"物料编号",
			"MaterialsName":"物料名称",
			"MaterialsType":"物料类型",
			"SafeUpperLimit":"安全上限",
			"SafeLowerLimit":"安全下限",
			"CurrentStorage":"当前库存",
			"Modifiable":"操作"
			}
	</script>
</head>
<body>
	<div id="searchbox">
		<div class="header">查询</div>
		<form name="query" id="query" method="post" action="">
			<label for="MaterialsName">物料名称</label>
			<input type="text" id="MaterialsName" name="MaterialsName">
			<label for="MaterialsId">物料编号</label>
			<input type="text" id="MaterialsId" name="MaterialsId">
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