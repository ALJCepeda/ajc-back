<?php
$navbarModel =[
	'menu' => [
		'Home' => '/',
		'Eval' => '/eval',
		'Snake' => '/snake',
	 	'Repair' => '/repair',
	 	'Portfolio' => '/portfolio',
	 	'About Me' => '/aboutme'
	],
	'notifications' => $parameters['notifications'] ?? [],
	'path' => $parameters['path']
];

?>

<!DOCTYPE html>
<html lang='en'>

<head>
	<meta charset='utf-8'>
	<meta name='viewport' content='width=device-width, initial-scale=1'>
	<meta name='author' content='ALJCepeda'>
	<title><?= $parameters['title'] ?? 'ALJCepeda' ?></title>

	<script type='text/javascript' src='jquery.js'></script>
	<script type='text/javascript' src='bootstrap.js'></script>
	<script type='text/javascript' src='bootstrap.mdl.js'></script>

	<link rel='stylesheet' type='text/css' href='bootstrap.css'>
	<link rel='stylesheet' type='text/css' href='bootstrap.mdl.css'>
	<link rel='stylesheet' type='text/css' href='/assets/css/flex.css'>
	<link rel='stylesheet' type='text/css' href='/assets/css/pages/index.css'>
	<link rel='stylesheet' type='text/css' href='/assets/css/pages/navbar.css'>
</head>

<div class='header-panel shadow-z-2'>
	<div class='container-fluid'>
		<div class='row'>
			<div class='col-xs-3'>
				<h1>ALJCepeda</h1>
			</div>
		</div>
	</div>
</div>

<div class='container-fluid main'>
	<div class='row'>
		<div class='col-xs-2 menu'>
			<ul>
				<li>Home</li>
				<li>Eval</li>
				<li>Snake</li>
				<li>Repair</li>
				<li>Portfolio</li>
				<li>About Me</li>
			</ul>
		</div>
		<div class='col-xs-9 page active' style='height:400px;'>
			<div class='row'>
				<div class='col-xs-12'>
					<div class='well page active'>
						<h1> This is a page </h1>
						<p> This is a paragraph </p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</html>
