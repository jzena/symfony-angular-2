<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller {

	public function indexAction(Request $request) {
		// replace this example code with whatever you need
		return $this->render('default/index.html.twig', [
					'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
		]);
	}

	public function loginAction(Request $request) {
		$helpers = $this->get("app.helpers");
		$jwt_auth = $this->get("app.jwt_auth");

		// Recibir json por post
		$json = $request->get("json", null);

		if ($json != NULL) {
			$params = json_decode($json);
			$email = (isset($params->email)) ? $params->email : NULL;
			$password = (isset($params->password)) ? $params->password : NULL;
			$getHash = (isset($params->gethash)) ? $params->gethash : NULL;

			$emailContraint = new Assert\Email();
			$emailContraint->message = "this email is not valid";
			$validate_email = $this->get("validator")->validate($email, $emailContraint);

			//cifrar la password
			$pwd = hash('sha256', $password);
			//$pwd = $password;
			
			if (count($validate_email) == 0 && $password != NULL) {
				if ($getHash == NULL) {
					$signup = $jwt_auth->signup($email, $pwd);
				} else {
					$signup = $jwt_auth->signup($email, $pwd, true);
				}

				return New JsonResponse($signup);
			} else {
				return $helpers->json(array(
							"status" => "error",
							"data" => "Login not valid"
				));
			}
		} else {
			return $helpers->json(array(
						"status" => "error",
						"data" => "Send json with post"
			));
		}
	}

	public function pruebasAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$hash = $request->get("authorization", NULL);
		$check = $helpers->authCheck($hash);

		var_dump($check);
		die();
		/*
		  $em = $this->getDoctrine()->getManager();
		  $users = $em->getRepository('BackendBundle:User')->findAll();

		  return $helpers->json($users); */
	}

}
