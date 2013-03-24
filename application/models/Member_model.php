<?php

/**
 * Member_model - [Add a short description of what this file does]
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

class Member_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function getMember($member) {
//        Escape queries to prevent vs SQL injection
        $query = $this->db->query('CALL load_members_for(' . $this->db->escape($member) . ')');
        $response;

        foreach ($query->result_array() as $row) {
            $response[$row['student_number']] = $row;
        }

        return $response;
    }

    public function evaluateMember($evaluator, $evaluated, $in_answers) {

        $to_insert_answers = array();

        for ($i = 0; $i < count($in_answers); $i++) {
            $to_insert_answers[] = array('student_number' => $evaluated, 'question_id' => ($i + 1), 'answer_body' => $in_answers[$i]);
        }

        $this->db->insert('checks', array('evaluator' => $evaluator, 'evaluated' => $evaluated));
        $this->db->insert_batch('answers', $to_insert_answers);
    }

}

/* End of file Member_model.php */