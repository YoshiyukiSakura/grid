# HOW TO USE THIS ADD-ON
##上手
##START
引入jQuery库,grid.js文件;  
use the jQuery library and the grid.js file;
```
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://kirisamenana.com/frontend/sliontek/grid.js"></script>
```
使用jQuery选择器来调用Grid()方法;  
initial grid like this;
```
<script>
grid = $("#container").Grid();//需要注意这个方法会清空#container元素再构建表格
</script>
```
##参数说明
##ARGUMENTS
这个Grid()方法接收一个对象参数,通常至少需要有【字段】、【数据】等属性;  
$().Grid() recepts a objects containing all the options;   
Basically,you need at least serveral options to initial the grid correctly;
```
var options = {"field":field,"url":"./whatever.php","param":{"page":1}}
```
###字段属性
###field
要使用Grid,必须定义一个field字段属性,用于查找数据、填充表头等,field属性应该为一个对象数组;  
you must define a 'field' to popular the grid,it should be a objects array like this
```
option.field = [  { field: "TMno", text: "调拨单编号" },
              		{ field: "TMoutid", text: "出库仓库" },
              		{ field: "TMinid", text: "入库仓库" },
              		{ field: "TMdate", text: "调拨日期", replace: timestampTOdate }
               ]
```
field属性用于在json查找数据,text属性用于填充表头;
###数据
###data
你可以直接传入一个对象作为数据来填充表格,在option的data属性中传入这个对象即可;  
if you want to use a javascript object array popularing the grid , pass it like this:
```
grid({field:key, dataArr:data, pager:false})
```
传入的数据必须是一个对象数组,由于本插件是为使用URL的情况编写的,直接传入数据不被推荐,翻页部分也没有适配;  
data must be an array of objects like [{key:variable},{key:variable}]
###url
###使用返回json数据的URL接口
通常配合后端使用的情况都是用一个接口来提供json数据,并且接口可以接收参数来定制输出的内容,你可以在param属性里传入一个参数对象(来自表单或者其他),返回的json数据要求有一定的格式,带有page,size等额外参数;  
if you want to use a back end interface to provide the data,set option.url as you like,the interface should response a standard json string;  
you may also use {key:key,url:url,param:param} to post something to server before getting response
返回的json实例
a response json example
```
{"cur":1, "page":100, "data":[{"OrderNumber":1,"EngineerNumber":"1\u53f7\u5de5\u7a0b"}]}
```
##宽度
##width
参数option对象中可以设置一个width属性来定义表格总宽度,体现在table元素上,默认值是100%,可以传入100px或50%这样的字符串;  
列宽的指定方法是在field属性中添加width属性;
if you want to design the width of table,set option.width to your target string,the default value of table width is 100%;  
you may also design a column width by setting option.field[].width;  
##翻页功能
##PAGE BUTTON
翻页功能目前依赖后端实现的分页功能;
目前建议在传入数据的情况下设置option.pager = false 来禁用翻页,针对单页少量数据的情况;  
for now,the pager works for satuations using "url" rather than "data";  
if you have passed in a url,it will create a pager automatically;  
I suggest setting option.pager = false when you don't need a pager
##搜索框
##SEARCH BOX
目前Grid没有带内置的搜索功能,但是你可以借助外部的表单和setParam()方法来传入参数,实现搜索的功能,具体的搜索由后端完成,Grid只负责传入condition条件,辅助后端构成一个含有like的SQL语句;  
this grid doesn't contain a search function,instead,you may post some params to the server and let server side to deal with it.
The param data can come from a form or somewhere else,there are two ways to excute a search.
####如何传入参数
####use the .setParam function,which requires grid objects;
```
grid.setParam(your data objects);
grid.Grid(grid.opts);
```
##单页面中使用多个Grid的情况
##mutiple Grids in a single page
一个页面使用多个Grid的情况已经被验证不会造成严重的冲突,你需要考虑以下几点;  
1.表格之间最好不要有重复的数据,因为每个td元素都会被赋值ID,如果一定要重复来自某个接口的字段，你可以在option.id这里设置id后缀来进行区分;  
2.使用一个变量来接收后续可能需要操作的Grid对象,比如```var grid1 = $().Grid();var grid2 = $().Grid();```,这样你就可以通过grid1.opts的形式来访问其中的参数了

