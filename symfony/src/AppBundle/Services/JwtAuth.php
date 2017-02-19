<?php

namespace AppBundle\Services;

use Firebase\JWT\JWT;

class JwtAuth {

	public $manager;
	public $key;

	public function __construct($manager) {

		$this->manager = $manager;
		$this->key = "clave-secreta";
	}

	public function signup($email, $password, $getHash = null) {
		$key = $this->key;

		$user = $this->manager->getRepository('BackendBundle:User')->findOneBy(
				array(
					"email" => $email,
					"password" => $password
				)
		);

		$singup = FALSE;
		if (is_object($user)) {
			$singup = TRUE;
		}

		if ($singup == TRUE) {
			$token = array(
				"sub" => $user->getId(),
				"email" => $user->getEmail(),
				"name" => $user->getName(),
				"surname" => $user->getSurname(),
				"password" => $user->getPassword(),
				"image" => $user->getImage(),
				"iat" => time(),
				"exp" => time() + (7 * 24 * 60 * 60)
			);

			$jwt = JWT::encode($token, $key, 'HS256');
			$decode = JWT::decode($jwt, $key, array('HS256'));

			if ($getHash != NULL) {
				return $jwt;
			} else {
				return $decode;
			}

//return array("status" => "success", "data" => "Login success");
		} else {
			return array("status" => "error", "data" => "Login failed");
		}
	}

	public function checkToken($jwt, $getIdentity = false) {
		$key = $this->key;
		$auth = false;

		try {
			$decoded = JWT::decode($jwt, $key, array('HS256'));
		} catch (\UnexpectedValueException $e) {
			$auth = FALSE;
		} catch (\DomainException $e) {
			$auth = FALSE;
		}
		
		if(isset($decoded->sub)){
			$auth = true;
		}
		else{
			$auth = FALSE;
		}
		
		if($getIdentity == true){
			return $decoded;
		}
		else{
			return $auth;
		}
	}

}
