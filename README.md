# HOW TO USE MY GRID
##START
you should have a table element in your DOM to be the container of the grid,
and inintial the grid like this: grid({key:key,data:data});
I will talk about what is the argument about later.
##ARGUMENTS
my grid() function accepts a object containing at least two keys,"key" for field and "data" or "url"
for data to popular the grid.
###key
you must define a 'key' to popular the grid,it should objects like this
var key = {fieldinjson:fieldintable}
grid() will use fieldinjson as key to get value from 'data',and use fieldintable to popular table 
###data
if you want to use a javascript variable popularing the grid , pass it like this:
grid({key:key,data:data})
data must be array of objects like [{key:variable}]
###url
if want to use json posted by server,make sure the response being a object array just like 'data'
you may also use {key:key,url:url,param:param} to post something to server before getting response
##PAGE BUTTON

##SEARCH BOX
you may costract a form to post and use the response data to repopular the grid again
in my case,the form contains page,pagesize,search condition
grid({"key":key, "url":"./json.php", "param":$("#query").serialize()});
