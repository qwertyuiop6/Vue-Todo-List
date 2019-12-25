--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Ubuntu 11.2-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.2 (Ubuntu 11.2-1.pgdg18.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: todo_list; Type: TABLE; Schema: public; Owner: wxs
--

CREATE TABLE public.todo_list (
    todo_id integer NOT NULL,
    content character varying NOT NULL,
    start_date character varying NOT NULL,
    end_date character varying,
    status smallint NOT NULL,
    uid smallint NOT NULL
);


ALTER TABLE public.todo_list OWNER TO wxs;

--
-- Name: todo_list_todo_id_seq; Type: SEQUENCE; Schema: public; Owner: wxs
--

CREATE SEQUENCE public.todo_list_todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.todo_list_todo_id_seq OWNER TO wxs;

--
-- Name: todo_list_todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wxs
--

ALTER SEQUENCE public.todo_list_todo_id_seq OWNED BY public.todo_list.todo_id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: wxs
--

CREATE TABLE public.user (
    u_name character varying NOT NULL,
    u_passwd character varying NOT NULL,
    uid integer NOT NULL
);


ALTER TABLE public.user OWNER TO wxs;

--
-- Name: user_uid_seq; Type: SEQUENCE; Schema: public; Owner: wxs
--

CREATE SEQUENCE public.user_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_uid_seq OWNER TO wxs;

--
-- Name: user_uid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: wxs
--

ALTER SEQUENCE public.user_uid_seq OWNED BY public.user.uid;


--
-- Name: todo_list todo_id; Type: DEFAULT; Schema: public; Owner: wxs
--

ALTER TABLE ONLY public.todo_list ALTER COLUMN todo_id SET DEFAULT nextval('public.todo_list_todo_id_seq'::regclass);


--
-- Name: user uid; Type: DEFAULT; Schema: public; Owner: wxs
--

ALTER TABLE ONLY public.user ALTER COLUMN uid SET DEFAULT nextval('public.user_uid_seq'::regclass);


--
-- Name: todo_list todo_list_pkey; Type: CONSTRAINT; Schema: public; Owner: wxs
--

ALTER TABLE ONLY public.todo_list
    ADD CONSTRAINT todo_list_pkey PRIMARY KEY (todo_id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: wxs
--

ALTER TABLE ONLY public.user
    ADD CONSTRAINT user_pkey PRIMARY KEY (uid);


--
-- PostgreSQL database dump complete
--

