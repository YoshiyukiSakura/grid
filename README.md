# HOW TO USE MY GRID
##START
use the jQuery library and the grid.js file
```
<script src="http://libs.baidu.com/jquery/1.11.1/jquery.min.js"></script>
<script src="http://kirisamenana.com/frontend/sliontek/layer.js"></script>
<script src="http://kirisamenana.com/frontend/sliontek/grid.js"></script>
```
initial grid like this
```
<script>
grid = $("#container").Grid();
</script>
```
##ARGUMENTS
$().Grid() recepts a objects containing all the options;
Basically,you need at least serveral options to initial the grid correctly;
```
var options = {"field":key,"url":"./whatever.php","param":{"page":1}}
```
###key
you must define a 'key' to popular the grid,it should be a object like this
var key = {fieldinjson:"text in the table"}
grid() will use fieldinjson as key to get value from 'data',and use fieldintable to popular table 
###data
if you want to use a javascript variable popularing the grid , pass it like this:
grid({key:key,data:data})
data must be array of objects like [{key:variable}]
###url
if want to use json posted by server,make sure the response being a object array just like 'data'
you may also use {key:key,url:url,param:param} to post something to server before getting response
##PAGE BUTTON
for now,the pager works for satuations using "url" rather than "data";
if you have passed in a url,it will create a pager automatically;
##SEARCH BOX
just use a form,and pass it as param
in my case,the form contains page,pagesize,search condition
grid({"key":key, "url":"./json.php", "param":$("#query").serialize()});
