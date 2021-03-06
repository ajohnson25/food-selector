--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3
-- Dumped by pg_dump version 12.3

-- Started on 2020-05-26 22:15:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 2876 (class 1262 OID 24576)
-- Name: foodSelector; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "foodSelector" WITH TEMPLATE = template0 ENCODING = 'UTF8';


ALTER DATABASE "foodSelector" OWNER TO postgres;

\connect "foodSelector"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 214 (class 1255 OID 25094)
-- Name: get_remaining_foods(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_remaining_foods(_uuid uuid) RETURNS TABLE(food_id integer)
    LANGUAGE sql
    AS $_$
	SELECT id as food_id from foods
	except
	select food_id from user_preferences_for_foods where user_uuid = $1;
$_$;


ALTER FUNCTION public.get_remaining_foods(_uuid uuid) OWNER TO postgres;

--
-- TOC entry 213 (class 1255 OID 24737)
-- Name: upgrade_serial_to_identity(regclass, name); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.upgrade_serial_to_identity(tbl regclass, col name) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  colnum smallint;
  seqid oid;
  count int;
BEGIN
  -- find column number
  SELECT attnum INTO colnum FROM pg_attribute WHERE attrelid = tbl AND attname = col;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'column does not exist';
  END IF;

  -- find sequence
  SELECT INTO seqid objid
    FROM pg_depend
    WHERE (refclassid, refobjid, refobjsubid) = ('pg_class'::regclass, tbl, colnum)
      AND classid = 'pg_class'::regclass AND objsubid = 0
      AND deptype = 'a';

  GET DIAGNOSTICS count = ROW_COUNT;
  IF count < 1 THEN
    RAISE EXCEPTION 'no linked sequence found';
  ELSIF count > 1 THEN
    RAISE EXCEPTION 'more than one linked sequence found';
  END IF;  

  -- drop the default
  EXECUTE 'ALTER TABLE ' || tbl || ' ALTER COLUMN ' || quote_ident(col) || ' DROP DEFAULT';

  -- change the dependency between column and sequence to internal
  UPDATE pg_depend
    SET deptype = 'i'
    WHERE (classid, objid, objsubid) = ('pg_class'::regclass, seqid, 0)
      AND deptype = 'a';

  -- mark the column as identity column
  UPDATE pg_attribute
    SET attidentity = 'd'
    WHERE attrelid = tbl
      AND attname = col;
END;
$$;


ALTER FUNCTION public.upgrade_serial_to_identity(tbl regclass, col name) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 24629)
-- Name: food_preference; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_preference (
    id integer NOT NULL,
    name text NOT NULL,
    short_name text NOT NULL
);


ALTER TABLE public.food_preference OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 24627)
-- Name: food_preference_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.food_preference ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.food_preference_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


INSERT INTO public.food_preference (name, short_name) VALUES ('Like', 'like');
INSERT INTO public.food_preference (name, short_name) VALUES ('Haven''t Had', 'havent-had');
INSERT INTO public.food_preference (name, short_name) VALUES ('Don''t Like', 'dont-like');

--
-- TOC entry 202 (class 1259 OID 24588)
-- Name: foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foods (
    name text NOT NULL,
    image_file text NOT NULL,
    image_attribution_username text,
    image_attribution_fullname text,
    image_provider_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.foods OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24607)
-- Name: foods_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.foods ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.foods_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Orange', 'orange.jpg', '@runblue', 'Xiaolong Wong', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Banana', 'banana.jpg', '@giorgiotrovato', 'Giorgio Trovato', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Pomegranite', 'pomegranite.jpg', '@matyszczyk', 'Marta Matyszczyk', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Coffee', 'coffee.jpg', '@asthetik', 'Mike Kenneally', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Hamburger', 'hamburger.jpg', '@amir_v_ali', 'amirali mirhashemian', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Macaroni and cheese', 'macandcheese.jpg', '@hermez777', 'Hermes Rivera', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Sunny side up eggs', 'sunnysideupeggs.jpg', '@saraheboudreau', 'Sarah Boudreau', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Red Apple', 'apple.jpg', '@louishansel', 'Louis Hansel @shotsoflouis', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Kale', 'kale.jpg', '@charbeck', 'Char Beck', 2);
INSERT INTO public.foods (name, image_file, image_attribution_username, image_attribution_fullname, image_provider_id) VALUES ('Tomatoes', 'tomatoes.jpg', '@tomhermans', 'Tom Hermans', 2);



--
-- TOC entry 210 (class 1259 OID 24713)
-- Name: fs_user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fs_user (
    id integer NOT NULL,
    uuid uuid NOT NULL,
    date_created timestamp with time zone DEFAULT now(),
    date_last_login timestamp with time zone DEFAULT now()
);


ALTER TABLE public.fs_user OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24745)
-- Name: fs_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.fs_user ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.fs_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 24601)
-- Name: image_provider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image_provider (
    id integer NOT NULL,
    name text NOT NULL,
    attribution_required boolean NOT NULL
);


ALTER TABLE public.image_provider OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24599)
-- Name: image_provider_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.image_provider ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.image_provider_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



INSERT INTO public.image_provider (id, name, attribution_required) VALUES ('Public Domain', false);
INSERT INTO public.image_provider (id, name, attribution_required) VALUES ('Unsplash', true);


--
-- TOC entry 208 (class 1259 OID 24638)
-- Name: user_food_preferences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_food_preferences (
    id integer NOT NULL,
    user_uuid uuid NOT NULL,
    food_id integer NOT NULL,
    food_preference_id integer NOT NULL
);


ALTER TABLE public.user_food_preferences OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 24641)
-- Name: user_food_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.user_food_preferences ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_food_preferences_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 212 (class 1259 OID 25071)
-- Name: user_preferences_for_foods; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.user_preferences_for_foods AS
 SELECT ufp.id,
    ufp.user_uuid,
    ufp.food_id,
    ufp.food_preference_id,
    foods.name AS fd_name,
    food_preference.name AS fp_name
   FROM ((public.user_food_preferences ufp
     LEFT JOIN public.foods ON ((ufp.food_id = foods.id)))
     LEFT JOIN public.food_preference ON ((ufp.food_preference_id = food_preference.id)));


ALTER TABLE public.user_preferences_for_foods OWNER TO postgres;

--
-- TOC entry 2728 (class 2606 OID 24833)
-- Name: food_preference food_preference_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_preference
    ADD CONSTRAINT food_preference_pkey PRIMARY KEY (id);


--
-- TOC entry 2736 (class 2606 OID 24739)
-- Name: fs_user food_selector_user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fs_user
    ADD CONSTRAINT food_selector_user_pkey PRIMARY KEY (id);


--
-- TOC entry 2724 (class 2606 OID 24817)
-- Name: foods foods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);


--
-- TOC entry 2738 (class 2606 OID 25066)
-- Name: fs_user fs_user_uuid_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fs_user
    ADD CONSTRAINT fs_user_uuid_key UNIQUE (uuid);


--
-- TOC entry 2726 (class 2606 OID 24802)
-- Name: image_provider image_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image_provider
    ADD CONSTRAINT image_provider_pkey PRIMARY KEY (id);


--
-- TOC entry 2732 (class 2606 OID 24776)
-- Name: user_food_preferences user_food_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_food_preferences
    ADD CONSTRAINT user_food_preferences_pkey PRIMARY KEY (id);


--
-- TOC entry 2734 (class 2606 OID 25068)
-- Name: user_food_preferences user_food_preferences_user_uuid_food_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_food_preferences
    ADD CONSTRAINT user_food_preferences_user_uuid_food_id_key UNIQUE (user_uuid, food_id);


--
-- TOC entry 2729 (class 1259 OID 24762)
-- Name: fki_food_id_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_food_id_fkey ON public.user_food_preferences USING btree (food_id);


--
-- TOC entry 2730 (class 1259 OID 24750)
-- Name: fki_food_preference_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_food_preference_fkey ON public.user_food_preferences USING btree (food_preference_id);


--
-- TOC entry 2722 (class 1259 OID 24786)
-- Name: fki_image_attribution_fkey; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_image_attribution_fkey ON public.foods USING btree (image_provider_id);


--
-- TOC entry 2739 (class 1259 OID 24719)
-- Name: uuid_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX uuid_idx ON public.fs_user USING btree (uuid);


--
-- TOC entry 2742 (class 2606 OID 24818)
-- Name: user_food_preferences food_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_food_preferences
    ADD CONSTRAINT food_id_fkey FOREIGN KEY (food_id) REFERENCES public.foods(id) NOT VALID;


--
-- TOC entry 2743 (class 2606 OID 24834)
-- Name: user_food_preferences food_preference_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_food_preferences
    ADD CONSTRAINT food_preference_fkey FOREIGN KEY (food_preference_id) REFERENCES public.food_preference(id) NOT VALID;


--
-- TOC entry 2741 (class 2606 OID 24720)
-- Name: user_food_preferences fsuser_uuid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_food_preferences
    ADD CONSTRAINT fsuser_uuid_fkey FOREIGN KEY (user_uuid) REFERENCES public.fs_user(uuid) NOT VALID;


--
-- TOC entry 2740 (class 2606 OID 24803)
-- Name: foods image_provider_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foods
    ADD CONSTRAINT image_provider_fkey FOREIGN KEY (image_provider_id) REFERENCES public.image_provider(id) NOT VALID;


-- Completed on 2020-05-26 22:15:36

--
-- PostgreSQL database dump complete
--

