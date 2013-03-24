<?php

if (!defined('BASEPATH'))
    die();

class Frontpage extends Main_Controller {

    public function index() {
        $this->load->view('include/header');
        if ($this->session->userdata('student_id')) {
            echo 'chos';
        } else {
            $this->load->view('frontpage');
        }
        $this->load->view('include/footer');
    }

}

/* End of file frontpage.php */
/* Location: ./application/controllers/frontpage.php */
