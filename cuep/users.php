<?php 

	$users = array(
		array(
			'username'	=> 'admin',
			'password'	=> 'admin'
		),
		array(
			'username'	=> 'user1',
			'password'	=> 'password1'
		)
	);


	function users_get_match($username, $password){
		global $users;

		foreach ($users as $user) {
			if($user['username'] === $username){
				if($user['password'] === $password)
					return $user;

				return false;
			}
		}

		return false;
	}

?>