<?php

/**
 * api - [Add a short description of what this file does]
 *
 * [Add a long description of the file (1 sentence) and then delete my example]
 * Example: A PHP file template created to standardize code.
 * 
 * @package		mojaru
 * @author		University of the East Research and Development Unit
 * @author              Daryll Santos, <daryll.santos@gmail.com>
 * @copyright           Copyright (c) 2013
 * @license		http://opensource.org/licenses/mit-license.php
 * @link		https://www.facebook.com/ueccssrnd
 */
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

class Api extends CI_Controller {

    public function __construct() {
        parent::__construct();
    }

    public function index() {
//        $this->load->model('Member_model');
//        $result = $this->Member_model->get_member('20100156454');
//        echo json_encode($result);
    }

    public function checkIfLoggedIn() {
        $this->load->model('Login_model');
        $result = $this->Login_model->getCurrentUser($this->session->userdata('username'));
        
        if ($result != false) {
            echo json_encode($result);
        } else {
            header("HTTP/1.0 404 Not Found");
        }
    }

    public function evaluateMember() {
        $this->load->model('Member_model');
        $result = $this->Member_model->evaluateMember(
                $this->session->userdata('username'), $this->input->get('evaluated'), $this->input->get('answers'));

        echo json_encode($this->input->get('answers'));
    }

    public function getMembers() {
        $this->load->model('Member_model');
        $result = $this->Member_model->getMember($this->session->userdata('username'));
        echo json_encode($result);
    }

    public function login() {
        $this->load->model('Login_model');

        $result = $this->Login_model->checkLogin($this->input->get('username'), $this->input->get('password'));

        if ($result != false) {
            $this->session->set_userdata('username', $result['student_number']);
            echo json_encode($result);
        } else {
            header("HTTP/1.0 404 Not Found");
        }
    }

    public function logout() {
        return $this->session->unset_userdata('username');
    }

}

/* End of file api.php */