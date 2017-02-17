<?php
namespace AppBundle\Services;
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Helpers
 *
 * @author jzena
 */
class Helpers {
	
	public function json($data){
		$normalizers = array(new \Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer());
	    $encoders = array("json"=> new \Symfony\Component\Serializer\Encoder\JsonEncoder());
		
		$serializer = new \Symfony\Component\Serializer\Serializer($normalizers, $encoders);
		$json = $serializer->serialize($data, 'json');
		
		$response = new \Symfony\Component\HttpFoundation\Response();
		$response->setContent($json);
		$response->headers->set("Content-Type", "application/json");
		
		return $response;
	}
	
	public function  hola(){
		return "Hola desde el servicio";
	}	
}
