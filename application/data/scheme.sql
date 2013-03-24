/*
mojaru
University of the East Research and Development Unit
Daryll Santos, <daryll.santos@gmail.com>
Copyright (c) 2013
http://opensource.org/licenses/mit-license.php
https://www.facebook.com/ueccssrnd
*/

SET SQL_SAFE_UPDATES = 0;
CREATE DATABASE IF NOT EXISTS mojaru;
USE mojaru;

CREATE TABLE IF NOT EXISTS members(
  student_number VARCHAR(11) PRIMARY KEY,
  student_password VARCHAR(64) NOT NULL DEFAULT "danny",
  first_name VARCHAR(40) NOT NULL,
  last_name VARCHAR(40) NOT NULL,
  nick VARCHAR(16) NOT NULL,
  division VARCHAR (24) NOT NULL,
  is_new BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS questions(
  question_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(128) NOT NULL,
  details VARCHAR(512)
);

CREATE TABLE IF NOT EXISTS answers (
  student_number VARCHAR(11) NOT NULL,
  question_id INT UNSIGNED,
  answer_body TEXT
);

ALTER TABLE answers 
  ADD CONSTRAINT FK_student_number_answers
    FOREIGN KEY (student_number) REFERENCES members(student_number);

ALTER TABLE answers 
  ADD CONSTRAINT FK_question_id_answers
    FOREIGN KEY (question_id) REFERENCES questions(question_id);

CREATE TABLE IF NOT EXISTS checks (
  evaluator VARCHAR(11) NOT NULL,
  evaluated VARCHAR(11) NOT NULL
);

ALTER TABLE checks 
  ADD CONSTRAINT FK_student_number_evaluator
    FOREIGN KEY (evaluator) REFERENCES members(student_number);

ALTER TABLE checks 
  ADD CONSTRAINT FK_student_number_evaluated
    FOREIGN KEY (evaluated) REFERENCES members(student_number);

ALTER TABLE checks 
  ADD CONSTRAINT unique_evaluator_evaulated_relationship
    UNIQUE (evaluator, evaluated);

DROP PROCEDURE IF EXISTS `load_members_for`;
DELIMITER //
CREATE PROCEDURE `load_members_for`(IN in_evaluator VARCHAR(11))

BEGIN	  
DECLARE my_evaluator VARCHAR(11);
SET my_evaluator = in_evaluator;

CREATE TABLE holder ENGINE=InnoDB DEFAULT CHARSET=latin1 AS
	SELECT student_number, first_name, last_name, nick, division, FALSE AS evaluated
	  FROM members
	  ORDER by nick;

UPDATE holder SET evaluated = TRUE
  WHERE student_number IN (SELECT evaluated FROM checks WHERE evaluator = my_evaluator);

SELECT * FROM holder;

DROP TABLE holder;
	
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS `insert_default_data`;
DELIMITER //
CREATE PROCEDURE `insert_default_data`()

BEGIN	  
INSERT INTO members (student_number, first_name, last_name, nick, division) VALUES
  ('20090131547', 'Ruben James', 'Baring', 'James', 'Team Lead'),
  ('20100134961', 'Aaron Noel', 'De Leon', 'Aaron', 'Asst Team Lead'),
  ('20090169725', 'Dioren Jess', 'Pacoma', 'Dioren', 'Systems Head'),
  ('20090168686', 'Jose Marcelius', 'Hipolito', 'Joey', 'Web Head'),
  ('20090123016', 'Kevin', 'Tamayo', 'Kevin', 'Multi Head'),
  ('20090130566', 'Monica', 'Labbao', 'Monica', 'Docu Head'),
  ('20100150990', 'Jose Mari', 'Ramos', 'JM', 'Training Head'),
  ('20090133258', 'Aemy', 'Dulva', 'Aemy', 'Docu'),
  ('20100159328', 'Tony', 'Agote', 'Tony', 'Web'),
  ('20100166743', 'Adrian', 'Enriquez', 'Adrian', 'Web'),
  ('20100105337', 'Keith', 'Samson', 'Keith', 'Training'),
  ('20100123022', 'Diosa', 'Broncano', 'Diosa', 'Docu'),
  ('20110167798', 'Gil Francis', 'Abinal', 'Francis', 'Docu'),
  ('20110154057', 'Rea', 'Aborot', 'Rea', 'Systems'),
  ('20100117713', 'Karl Christian', 'Canlas', 'Karl', 'Systems'),
  ('20100158916', 'Mark', 'Saboriendo', 'Mark', 'Multi'),
  ('20100166958', 'Dianne Estefanie', 'Ocampo', 'Stef', 'Docu'),  
  ('20110113514', 'Argomer', 'Alcid', 'Gomer', 'Systems'),
  ('20110111881', 'Michael', 'Pippin', 'Michael', 'Systems'),
  ('20110122991', 'Ian Jasper', 'Laurel', 'Ianzz', 'Multi'),
  ('20100103422', 'Charmaine', 'Castillo', 'Charm', 'Docu'),
  ('20100131406', 'Patrick James', 'Lim', 'Pat', 'Web'),
  ('20090168299', 'Catherine', 'Bartoline', 'Cat', 'Systems'),
  ('20090148291', 'June Israel', 'Bagnes', 'June', 'Systems'),
  ('20090132813', 'Bernard Khristian', 'Santiago', 'Bk', 'Systems'),
  ('20090127154', 'Charles', 'Go', 'Charles', 'Multi'),
  ('20090139290', 'Anna Marie', 'Uy', 'Anna', 'Systems'),
  ('20090135312', 'Anna Jane Missann', 'Matillano', 'Missann', 'Multi'),
  ('20100104378', 'John Clifford', 'Ladion', 'JC', 'Training'),
  ('20110151821', 'Steven', 'Lim', 'Steven', 'Systems'),
  ('20090142577', 'Gemmaleah', 'Baniqued', 'Mogs', 'Systems'),
  ('20110118019', 'Lance Jasper', 'Lopez', 'Lance', 'Training'),
  ('20100100581', 'Sean Michael', 'Amador', 'Sean', 'Multi'),
  ('20100164816', 'Joshua Rafael', 'Tabucanon', 'Josh', 'Systems'),
  ('20090127165', 'Regina Grace', 'Espartinez', 'Grace', 'Training'),
  ('20100108643', 'Kristian Paul', 'Lugtu', 'Kristian', 'Web'),
  ('20100116969', 'Jarrie', 'Guerrero', 'Jarrie', 'Systems'),
  ('20100113960', 'Christine Lhor', 'Malaluan', 'Tinloor', 'Systems'),
  ('20100156454', 'Daryll', 'Santos', 'Daryll', 'Training')
;

UPDATE members SET student_password =reverse(student_number);

INSERT INTO questions (title) VALUES 
  ('What are the strengths of this person?'),
  ('In what ways can this person improve?'),
  ('What do you think of this person?');

INSERT INTO checks (evaluator, evaluated)
  SELECT student_number, student_number FROM members;
	
END //
DELIMITER ;
CALL insert_default_data();



/* End of file scheme.sql */