<?php 
	session_start();


	if(!empty($_POST['username']) && !empty($_POST['password'])){
		require('users.php');

		$user = users_get_match($_POST['username'], $_POST['password']);

		if($user){
			$_SESSION['isLoggedIn'] = $user;
		}

	}

	if(empty($_SESSION['isLoggedIn'])){
		include('index-loggedout.php');
	}else{
		include('index-loggedin.php');
	}
	
?>