<?php

/**
 * Login_model - [Add a short description of what this file does]
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

class Login_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function checkLogin($username = '', $password = '') {
        $query = $this->db->where('student_number', $username)->where('student_password', $password)->get('members');
        return $query->row_array();
    }
    
    public function getCurrentUser($username = '') {
        $query = $this->db->where('student_number', $username)->get('members');
        return $query->row_array();
    }

}

/* End of file Login_model.php */