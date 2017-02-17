<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Constraints as Assert;
class DefaultController extends Controller {

	public function indexAction(Request $request) {
		// replace this example code with whatever you need
		return $this->render('default/index.html.twig', [
					'base_dir' => realpath($this->getParameter('kernel.root_dir') . '/..'),
		]);
	}

	public function loginAction(Request $request) {
		$helpers = $this->get("app.helpers");

		// Recibir json por post
		$json = $request->get("json", null);

		if ($json != NULL) {
			$params = json_decode($json);
			$email = (isset($params->email)) ? $params->email : NULL;
			$password = (isset($params->password)) ? $params->password : NULL;

			$emailContraint = new Assert\Email();
			$emailContraint->message = "this email is not valid";
			$validate_email = $this->get("validator")->validate($email, $emailContraint);
			
			if(count($validate_email) == 0 && $password != NULL){
				echo 'Data success';
			}
			else{
				echo 'Data incorrect';
			}
			
		} else {
			echo 'Send json with post';
		}

		die();
	}

	public function pruebasAction(Request $request) {
		$helpers = $this->get("app.helpers");

		$em = $this->getDoctrine()->getManager();
		$users = $em->getRepository('BackendBundle:User')->findAll();

		return $helpers->json($users);
	}

}
