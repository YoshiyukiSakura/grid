<?php
$result = array();
$result['page'] = 10;
if ($_POST['page']>$result['page']) {
	$_POST['page']=$result['page'];
}
if (isset($_POST['OrderNumber'])&&!($_POST['OrderNumber']=="")) {
	//var_dump(file_get_contents('php://input'));
	$result = array();
	$json = array();
	$json[0] = array("OrderNumber"=>$_POST['OrderNumber'],
					"EngineerNumber"=>"1号工程",
					"MaterialsType"=>"工程类",
					"BuyDate"=>"2月30日",
					"DeleveryConfirm"=>"到货确认",
					"InvoiceCheck"=>"发票查验",
					"Modifiable"=>true
					 );
	$result['page'] = 1;
	$result['data'] = $json;
	echo json_encode($result);
	exit();
}

$json = array();
if (isset($_POST['page'])) {
	$page = $_POST['page'];
	$pagesize = 5 ;
	if (isset($_POST['pagesize'])&&(!$_POST['pagesize']=="")){$pagesize = $_POST['pagesize'];}
	$from = $pagesize * ($page - 1);
	$to = $pagesize * $page - 1;
		if (isset($_POST['OrderNumber'])&&!($_POST['OrderNumber']=="")) {
		//var_dump(file_get_contents('php://input'));
		$json = array();
		$json[0] = array("OrderNumber"=>$_POST['OrderNumber'],
						"EngineerNumber"=>"1号工程",
						"MaterialsType"=>"工程类",
						"BuyDate"=>"2月30日",
						"DeleveryConfirm"=>"到货确认",
						"InvoiceCheck"=>"发票查验",
						"Modifiable"=>true
						 );
		}
	for ($i=$from; $i <= $to; $i++) {
		$json[$i] = array("OrderNumber"=>$i,
				"EngineerNumber"=>"1号工程",
				"MaterialsType"=>"工程类",
				"BuyDate"=>"2月30日",
				"DeleveryConfirm"=>"到货确认",
				"InvoiceCheck"=>"发票查验",
				"Modifiable"=>true
					 );
	}
}

$result['data'] = $json;

//echo json_encode($json);
echo json_encode($result);
