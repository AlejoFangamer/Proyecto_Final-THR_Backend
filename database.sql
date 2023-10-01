DROP TABLE IF EXISTS integrantes;
DROP TABLE IF EXISTS juegos;
DROP TABLE IF EXISTS blog;

CREATE TABLE integrantes (
  id_mem SERIAL PRIMARY KEY,
  nombre_mem VARCHAR(30),
  pais_mem VARCHAR(30),
  role_mem VARCHAR(50)[],
  info_mem VARCHAR(100)
);

CREATE TABLE juegos (
  id_juego SERIAL PRIMARY KEY,
  nombre_juego VARCHAR(30),
  p_img_juego TEXT NULL,
	b_img_juego TEXT NULL,
  genero_juego VARCHAR(50)[],
  estado_juego VARCHAR(50),
  info_juego VARCHAR(200)
);

CREATE TABLE blog (
  id_blog SERIAL PRIMARY KEY,
  titulo_blog VARCHAR(30),
  fecha_blog DATE DEFAULT CURRENT_DATE,
  thumb_blog TEXT NULL,
  info_blog VARCHAR(200)
);

INSERT INTO integrantes (nombre_mem,pais_mem,role_mem,info_mem)
VALUES
  ('Alejandro Moreno','Colombia',ARRAY ['Diseñador,'Artista'],"Hola, hago arte xd");

INSERT INTO juegos (nombre_juego,genero_juego,estado_juego,info_juego)
VALUES
  ('Puzzly World',ARRAY ['Aventura','Roguelike'],'En desarrollo','Estoy calvo');

INSERT INTO blog (titulo_blog,thumb_blog,info_blog)
VALUES
  ('Holiii','https://http.cat/images/301.jpg','Tambien estoy calvo'),
  ('Nos separamos',,'Adios xd'); 

SELECT * FROM integrantes;