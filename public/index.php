<?php
//Does all preprocessing such as providing dependencies, constants and refreshes session
require '../resources/config.php';
$uri = $_SERVER['REQUEST_URI'];

if($uri !== '/' && $uri !== '/index.php') {
	header('Location: /#invalid');
	die();
}
?>

<!DOCTYPE html>
<html lang='en'>

<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<meta name='author' content='ALJCepeda'>
	<title>ALJCepeda</title>

	<script type='text/javascript' src='/libs/jquery.min.js'></script>
	<script type='text/javascript' src='/libs/underscore-min.js'></script>
	<script type='text/javascript' src='/libs/knockout-latest.js'></script>
	<script type='text/javascript' src='/libs/bootstrap.min.js'></script>
	<script type='text/javascript' src='/libs/material.min.js'></script>
	<script type='text/javascript' src='/libs/backbone-min.js'></script>

	<link rel='stylesheet' type='text/css' href='/libs/bootstrap.min.css'>
	<link rel='stylesheet' type='text/css' href='/libs/bootstrap-material-design.min.css'>

	<link rel='stylesheet' type='text/css' href='/assets/css/flex.css'>
	<link rel='stylesheet' type='text/css' href='/assets/css/index.css'>
	<script type='text/javascript' src='/libs/require.js' data-main='/index' ></script>
</head>
<body>
	<div id='main' class='container-fluid'>
		<div class='row menu'>
      <div class='col-xs-2 header-panel shadow-z-2'>
        <h4>ALJCepeda</h4>
      </div>

			<ul data-bind='foreach: menuTabs'>
				<li>
          <a data-bind='text: $data.name, click:$root.clickedTab, attr: { id:"menu_" + $data.id, name:$data.name, href:$data.hash }'></a>
        </li>
			</ul>
    </div>
    <div class='row'>
			<div id='pages' class='col-xs-12 pages' style='height:100%; background-color:#B3E5FC'>
			</div>
		</div>
	</div>
</body>
</html>
