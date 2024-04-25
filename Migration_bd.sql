DROP DATABASE IF EXISTS travail_final;
CREATE DATABASE travail_final;

drop table if exists sous_taches;
drop table if exists taches;
drop table if exists utilisateur;

create table utilisateur(
	id SERIAL primary key,
	nom VARCHAR(30),
	prenom VARCHAR(30),
	courriel  VARCHAR(255),
	cle_api VARCHAR(200),
	password VARCHAR(100)
);

CREATE TABLE public.taches(
	id SERIAL primary key,
	utilisateur_id INTEGER,
	titre VARCHAR(100),
	description VARCHAR(100),
	date_debut DATE,
	date_echeance DATE,
	complete BOOL,
	foreign key(utilisateur_id) references public.utilisateur(id)
);

create table sous_taches(
	id SERIAL primary key,
	tache_id INTEGER,
	titre VARCHAR(100),
	complete BOOL,
	foreign key (tache_id) references public.taches(id)
);