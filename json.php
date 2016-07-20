<?php
if (isset($_POST['MaterialsName'])&&!($_POST['MaterialsName']=="")) {
	//var_dump(file_get_contents('php://input'));
	$json = array();
	$json[0] = array('MaterialsNumber' => $_POST['MaterialsName'],
					 "MaterialsName"=>"name",
					 "MaterialsType"=>"type",
					 "SafeUpperLimit"=>1000,
					 "SafeLowerLimit"=>200,
					 "CurrentStorage"=>888,
					 "Modifiable"=>true
					 );
	echo json_encode($json);
	exit();
}
$json = array();
$json[0] = array('MaterialsNumber' => 123,
				 "MaterialsName"=>"name",
				 "MaterialsType"=>"type",
				 "SafeUpperLimit"=>1000,
				 "SafeLowerLimit"=>200,
				 "CurrentStorage"=>888,
				 "Modifiable"=>true
				 );
$json[1] = array('MaterialsNumber' => 124,
				 "MaterialsName"=>"name",
				 "MaterialsType"=>"type",
				 "SafeUpperLimit"=>1000,
				 "SafeLowerLimit"=>200,
				 "CurrentStorage"=>888,
				 "Modifiable"=>true
				 );
$json[2] = array('MaterialsNumber' => 124,
				 "MaterialsName"=>"name",
				 "MaterialsType"=>"type",
				 "SafeUpperLimit"=>1000,
				 "SafeLowerLimit"=>200,
				 "CurrentStorage"=>888,
				 "Modifiable"=>true
				 );
$json[3] = array('MaterialsNumber' => 124,
				 "MaterialsName"=>"name",
				 "MaterialsType"=>"type",
				 "SafeUpperLimit"=>1000,
				 "SafeLowerLimit"=>200,
				 "CurrentStorage"=>888,
				 "Modifiable"=>true
				 );
$json[4] = array('MaterialsNumber' => 124,
				 "MaterialsName"=>"name",
				 "MaterialsType"=>"type",
				 "SafeUpperLimit"=>1000,
				 "SafeLowerLimit"=>200,
				 "CurrentStorage"=>888,
				 "Modifiable"=>true
				 );
echo json_encode($json);