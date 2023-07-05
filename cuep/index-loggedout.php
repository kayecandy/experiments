<!DOCTYPE html>
<html>
<head>
	<title>CUEP Image Finder</title>
	<link rel="icon" href="//kayecandy.github.io/cdn/favicon.ico">
	
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">

	<!-- Font -->
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,200,400" rel="stylesheet">


	<!-- Self -->
	<style type="text/css">
		body{
			font-family: 'Roboto', sans-serif;
			text-align: center;
			font-weight: lighter;
			font-size: 130%;
		}

		h1{
			font-weight: lighter;
			font-size: 300%;
		}

		button{
			border: none;
			outline: none;
			padding: 8px 15px;
			-moz-border-radius: 5px;
			     border-radius: 5px;
			font-family: 'Roboto';
			font-size: 70%;
			font-weight: bold;
			letter-spacing: 2px;
			background: #048ba8;
			color: white;
			cursor: pointer;

			-webkit-transition: all 0.5s cubic-bezier(0.21, 0.46, 0.16, 1.68);
			-o-transition: all 0.5s cubic-bezier(0.21, 0.46, 0.16, 1.68);
			-moz-transition: all 0.5s cubic-bezier(0.21, 0.46, 0.16, 1.68);
			transition: all 0.5s cubic-bezier(0.21, 0.46, 0.16, 1.68);
		}

		button:hover{

			-webkit-transform: scale(1.1);
			   -moz-transform: scale(1.1);
			    -ms-transform: scale(1.1);
			     -o-transform: scale(1.1);
			        transform: scale(1.1);
		}


		input{
			padding: 4px 15px;
			outline: none;
			border: none;
			border-bottom: 2px solid #cccccc;
			font-size: 100%;
			font-weight: lighter;
			font-family: monospace;
			letter-spacing: 1px;
			width: 250px;
			margin-bottom: 20px;

			-webkit-transition: all 0.3s ease-in-out;
			-o-transition: all 0.3s ease-in-out;
			-moz-transition: all 0.3s ease-in-out;
			transition: all 0.3s ease-in-out;
		}

		input:hover,
		input:focus{
			border-bottom: 2px solid #f18f01;
		}

	</style>
</head>
<body>

	<form method="POST">
		<h1>Login</h1>
		Username: <input type="text" name="username"><br>
		Password: <input type="password" name="password"><br>
		<br>
		<button type="submit">GO</button>
	
	</form>
	
</body>
</html>