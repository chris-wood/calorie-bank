# Treats schema
 
# --- !Ups



# table for the treats
CREATE SEQUENCE treat_id_seq;
CREATE TABLE treat (
    id integer NOT NULL DEFAULT nextval('treat_id_seq'),
    name varchar(255),
    calories integer
);

# table for the treat locations
CREATE SEQUENCE treat_location_id_seq;
CREATE TABLE treat_location (
    id integer NOT NULL DEFAULT nextval('treat_location_id_seq'),
    name varchar(255),
    address varchar(255),
    url varchar(255),
    latitude double,
    longitude double
);

# table that ties treats/locations together
CREATE SEQUENCE treat_location_pair_id_seq;
CREATE TABLE treat_location_pair (
    id integer NOT NULL DEFAULT nextval('treat_location_pair_id_seq'),
    treat_id integer, 
    treat_location_id integer
);
 
# --- !Downs
 
DROP TABLE treat;
DROP SEQUENCE treat_id_seq;
DROP TABLE treat_location;
DROP SEQUENCE treat_location_id_seq;
DROP TABLE treat_location_pair;
DROP SEQUENCE treat_location_pair_id_seq;
