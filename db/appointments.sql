DROP TABLE IF EXISTS public.users;

CREATE TABLE public.users (
    "user_id" serial NOT NULL PRIMARY KEY,
    "user_name" character varying(64) UNIQUE NOT NULL,
    "first_name" character varying(50),
    "last_name" character varying(50),
    "creation_date" timestamp without time zone NOT NULL,
    "last_access" timestamp without time zone NOT NULL,
    "password" character varying(64) NOT NULL
);

DROP TABLE IF EXISTS public.clients;

CREATE TABLE public.clients (
    "client_id" serial NOT NULL PRIMARY KEY,
    "first_name" character varying(50),
    "last_name" character varying(50),
	"age" smallint,
	"email" character varying(60),
	"telephone" character varying(20)
);





DROP TABLE IF EXISTS public.treatments;

CREATE TABLE public.treatments (
    "treatment_id" serial NOT NULL PRIMARY KEY,
    "treatment_name" character varying(80),
    "treatment_duration" smallint
);

DROP TABLE IF EXISTS public.physios;

CREATE TABLE public.physios (
    "physio_id" serial NOT NULL PRIMARY KEY,
    "physio_name" character varying(60),
    "description" varchar(200)
);

DROP TABLE IF EXISTS public.appointments;

CREATE TABLE public.appointments (
    "appointment_id" serial NOT NULL PRIMARY KEY,
    "client_name" character varying(80),
    "physio_name" character varying(60),
    "treatment" character varying(80),
    "start_datetime" timestamp,
    "end_datetime" timestamp,
	"email" character varying(60),
	"telephone" character varying(20)
);