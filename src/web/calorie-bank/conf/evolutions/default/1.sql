# Treats schema
 
# --- !Ups

CREATE SEQUENCE treat_id_seq;
CREATE TABLE TREAT (
    id integer NOT NULL DEFAULT nextval('treat_id_seq'),
    name varchar(255),
    calories int
);
 
# --- !Downs
 
DROP TABLE TREAT;
DROP SEQUENCE treat_id_seq;