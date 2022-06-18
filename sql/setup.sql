-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists cats;
DROP TABLE IF EXISTS quotes;
DROP TABLE IF EXISTS episodes;
DROP TABLE IF EXISTS authors_books;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP table if exists friends;
DROP TABLE IF EXISTS characters;


CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR,
    pob VARCHAR,
    dob INT NOT NULL
);


INSERT INTO books (
    title, released
)

VALUES 
    ('The Monster at the end of this book', 1971),
    ('Lovable furry old Grovers resting places', 1984),
    ('Spots First Walk', 1981),
    ('Wheres Spot', 1980)
;

INSERT INTO authors (
    name,
    pob,
    dob
)

VALUES 
('Eric Hill', 'Holloway, London', 1927),
('Jon Stone', 'New Haven, Connecticut', 1932),
('Stephen King', 'Bangor, Maine', 1958);


create table friends (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    status VARCHAR NOT NULL
);

INSERT INTO friends (name, status) VALUES
('Ross', 'unknown'),
('Phoebe', 'Alive'),
('Rachel', 'Alive'),
('Monica', 'Alive'),
('Chandler', 'Alive'),
('Joey', 'Alive');

create table cats (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    URL VARCHAR NOT NULL,
    year INT NOT NULL,
    lives INT NOT NULL,
    is_sidekick Boolean
);
INSERT INTO cats (name, type, URL, year, lives, is_sidekick) VALUES
('Felix', 'Tuxedo','https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Felix_the_cat.svg/200px-Felix_the_cat.svg.png', 1892, 3, false),
('Garfield', 'Orange Tabby','https://static.wikia.nocookie.net/garfield/images/9/9f/GarfieldCharacter.jpg', 1978, 7, false),
('Duchess', 'Angora', 'https://static.wikia.nocookie.net/disney/images/e/eb/Profile_-_Duchess.jpeg', 1970, 9, false),
('Stimpy', 'Manx', 'https://static.wikia.nocookie.net/renandstimpy/images/c/c1/Ren-stimpy-25-anniversar-hp2.png', 1990, 1, true),
('Sylvester', 'Tuxedo', 'https://static.wikia.nocookie.net/charactercommunity/images/7/73/SylvesterDance.png', 1945, 1, true),
('Tigger', 'Tiger', 'https://www.pinclipart.com/picdir/big/150-1504133_tigger-tigger-cartoon-me-clipart-png-image-download.png',1928, 8, false),
('Hello Kitty', 'Angora', 'https://cdn.shopify.com/s/files/1/0054/4371/5170/products/FiGPiN_360HelloKittySANRIOPIN.png?v=1627413934',1974, 9, false),
('Hobbes', 'Tiger', 'https://sketchok.com/images/articles/01-cartoons/000-va/102/10.jpg', 1985, 6, true); 

CREATE TABLE characters (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  first_name VARCHAR,
  last_name VARCHAR
);

INSERT INTO characters (
  first_name,
  last_name
)
VALUES 
  ('Moira', 'Rose'),
  ('Johnny','Rose'),
  ('David','Rose'),
  ('Alexis','Rose'),
  ('Stevie','Budd'),
  ('Roland','Schitt'),
  ('Jocelyn', 'Schitt')
;