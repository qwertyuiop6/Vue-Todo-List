--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.19
-- Dumped by pg_dump version 9.5.17

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: todo_list; Type: TABLE; Schema: public; Owner: wxs
--

CREATE TABLE public.todo_list (
    status smallint NOT NULL,
    uid integer NOT NULL,
    id integer NOT NULL,
    content character varying NOT NULL,
    start_date character varying,
    end_date character varying
);


ALTER TABLE public.todo_list OWNER TO wxs;

--
-- Name: todo_list_id_seq; Type: SEQUENCE; Schema: public; Owner: wxs
--

CREATE SEQUENCE public.todo_list_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 99999
    CACHE 1;


ALTER TABLE public.todo_list_id_seq OWNER TO wxs;

--
-- Name: user; Type: TABLE; Schema: public; Owner: wxs
--

CREATE TABLE public."user" (
    name character varying NOT NULL,
    passwd character varying NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."user" OWNER TO wxs;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: wxs
--

CREATE SEQUENCE public.user_id_seq
    START WITH 1001
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 999999
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO wxs;

--
-- Name: todo_list_pkey; Type: CONSTRAINT; Schema: public; Owner: wxs
--

ALTER TABLE ONLY public.todo_list
    ADD CONSTRAINT todo_list_pkey PRIMARY KEY (id);


--
-- Name: user_pkey; Type: CONSTRAINT; Schema: public; Owner: wxs
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: todo用户id; Type: FK CONSTRAINT; Schema: public; Owner: wxs
--

ALTER TABLE ONLY public.todo_list
    ADD CONSTRAINT "todo用户id" FOREIGN KEY (uid) REFERENCES public."user"(id) NOT VALID;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

