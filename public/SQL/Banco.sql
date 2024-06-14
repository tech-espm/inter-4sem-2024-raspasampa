CREATE DATABASE IF NOT EXISTS Interdisciplinar_IV_teste20 DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE Interdisciplinar_IV_teste20;

CREATE TABLE ano (
	ano int NOT NULL PRIMARY KEY
);

INSERT INTO ano (ano) VALUES (2000), (2001), (2002), (2003), (2004), (2005), (2006), (2007), (2008), (2009), (2010), (2011), (2012), (2013), (2014), (2015), (2016), (2017), (2018), (2019), (2020), (2021), (2022), (2023);

CREATE TABLE bairro (
	id_bairro int NOT NULL PRIMARY KEY,
    nome_bairro varchar(50) NOT NULL,
    latitude float,
    longitude float,
    unique key un_bairro_nome_bairro (nome_bairro)
);

CREATE TABLE indicador (
	id_indicador int NOT NULL PRIMARY KEY,
    nome_indicador varchar(50) NOT NULL,
    unique key un_indicador_nome_indicador (nome_indicador)
);

CREATE TABLE evidencia (
	id_evidencia int NOT NULL PRIMARY KEY,
    ano int NOT NULL,
    valor float NOT NULL,
    id_bairro int NOT NULL,
    id_indicador int NOT NULL,
	constraint fk_evidencia_id_bairro foreign key (id_bairro) references bairro (id_bairro),
	constraint fk_evidencia_id_indicador foreign key (id_indicador) references indicador (id_indicador)
);