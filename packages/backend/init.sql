--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9
-- Dumped by pg_dump version 14.6 (Homebrew)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: resource
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO resource;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: resource
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO resource;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: resource
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: resource
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO resource;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: resource
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO resource;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: resource
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: links; Type: TABLE; Schema: public; Owner: resource
--

CREATE TABLE public.links (
    id uuid NOT NULL,
    list_id uuid,
    url character varying(255) NOT NULL,
    title character varying(255),
    image character varying(255),
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.links OWNER TO resource;

--
-- Name: lists; Type: TABLE; Schema: public; Owner: resource
--

CREATE TABLE public.lists (
    id uuid NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.lists OWNER TO resource;

--
-- Name: lists_lists; Type: TABLE; Schema: public; Owner: resource
--

CREATE TABLE public.lists_lists (
    id uuid NOT NULL,
    source_id uuid,
    target_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.lists_lists OWNER TO resource;

--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: resource
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
1	20221208060346_init.ts	1	2022-12-28 14:08:40.561+09
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: resource
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: resource
--

COPY public.links (id, list_id, url, title, image, description, created_at) FROM stdin;
202419f7-96dc-4ad1-b96f-bee33f94d633	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=bSkJujBv1ZM	[ᴘʟᴀʏʟɪsᴛ] 설레는 겨울이 왔어	https://i.ytimg.com/vi/bSkJujBv1ZM/hqdefault.jpg	겨울 참 좋다❄️사진: yuns9ul 윤슬 작가님께서 제공해주셨습니다.너무 예쁜 작가님의 피드 🖤🤎https://instagram.com/yuns9ul?igshid=YmMyMTA2M2Y=_______________________________________________No c...	2022-12-28 14:31:01.592579+09
ba6e91a0-74b2-40f4-9ff2-0991fcf75b22	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=uubwHQUpUHM	Anan Ryoko - Snow Of Spring	https://i.ytimg.com/vi/uubwHQUpUHM/maxresdefault.jpg	smooth..	2022-12-28 14:31:21.033201+09
c5f8ad12-958d-467c-a09e-35fff713c342	58fb45f8-3cf6-4a20-9e8c-306f4a0a9aae	https://www.youtube.com/watch?v=HPgStyzuIi4	고양이가 좋아하는 음악(골골송 포함)😺, 분리불안 해소 음악, 고양이가 편안해지는 음악, 고양이 치료 음악	https://i.ytimg.com/vi/HPgStyzuIi4/maxresdefault.jpg	이번 곡은 고양이를 위한 음악입니다.고양이가 불안해 하거나 혼자 있을 때 틀어주기 위해 만든 음악입니다.10분 간격으로 골골 소리를 넣어주어 고양이에게 편안함을 줄 수 있습니다.편의를 위해 광고는 없으며, 3시간 뒤 화면이 어두워 집니다.#고양이음악 #고양이자장가 #골골송Music...	2022-12-28 14:32:05.571439+09
7050d934-d150-42d4-a564-52a0888cddd2	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=oFzqLEBH9V4	반려견과 사는 30대 직장인의 하루ㅣ혼자 사는데 강아지 입양 고민중이라면 보세요	https://i.ytimg.com/vi/oFzqLEBH9V4/maxresdefault.jpg	혼자 사는 직장인도 강아지를 입양할 수 있을까? 요즘엔 강아지 유치원처럼 반려견을 위한 공간들이 많이 생겨 1인 가구도 충분히 반려견과 살 수 있다고 생각해요. 다만, 독박육견(?)이다 보니 책임져야 할 부분들이 더 많다는 점~#누렁이 #믹스견 ##유기견 #시고르자브종 #강아지유치...	2023-01-01 23:28:50.279213+09
ccee5db6-f1a0-48ac-976a-9973033db731	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=coolxnT1UGw	모모의 입양일기 | 유기견•믹스견 입양 | 입양 후 3개월 기록	https://i.ytimg.com/vi/coolxnT1UGw/maxresdefault.jpg	유기견 입양 브이로그입니다3월에 입양해서 7월까지의 과정을 담았어요#유기견 #유기견입양 #믹스견 #모모 #탱이	2023-01-01 23:32:59.033212+09
5cf64b92-3c47-476b-a75a-3dd0e6c5dc53	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=J0URNQb3lQE	유기견 입양, 파보 바이러스 완치 vlog💊 입양 첫 날, 입원 치료, 브이로그 | 포인핸드	https://i.ytimg.com/vi/J0URNQb3lQE/maxresdefault.jpg	긴 영상 시청해 주셔서 고맙습니다♥치료 비용 등 더 자세한 후기는 블로그에 있어요https://m.blog.naver.com/laboratori/222227417236[파보 바이러스]유기견 보호소에서 데려와 걸린 것이 아니라펫샵에서도 흔한 질병인 파보바이러스는 주로 6개월 미만의 ...	2023-01-01 23:33:13.656482+09
0221721d-2125-4426-8a2f-a48e40780e44	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=IvFHno9yA4s	강아지 입양 후 한달간의 기록 / 상주 유기견보호소 / 경북애니멀호더구조견 / 유기견입양	https://i.ytimg.com/vi/IvFHno9yA4s/maxresdefault.jpg	2021.9.12 가족이 된 조이입양후 한달간의 기록이에요!지금은 완전 도시강아지가 되었지만 처음엔 적응하느라 혼났어요!	2023-01-01 23:33:24.341456+09
d78bc759-c9d9-4fc4-83f5-92c0a364de5e	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=a3ztYapj1Bc	동생이 처음 집에 온날. #강아지	https://i.ytimg.com/vi/a3ztYapj1Bc/maxresdefault.jpg	#강아지 #말티즈 #말티푸 #강아지브이로그 #합사 안녕하세요. 여름이와 동동이입니다. ㅎㅎ 오늘은 여름이와 동동이의 첫 만남 순간을 담아보았어요~ 어색 어색했던 게 어제 같은데 벌써 시간이 많이 흘렀네요. 재밌게 즐겨주세요. 오늘도 시청해주셔서 감사합니다.■Instagram ID ...	2023-01-02 00:00:20.682805+09
f4b82bf0-fd11-4572-97c5-82afad7245e8	1002c24f-b60e-4c4f-9b61-912c0c83f08b	https://www.youtube.com/watch?v=ISrRj0EAhzA	아기 강아지가 거품 물며 쓰러진 이유 / 화남주의	https://i.ytimg.com/vi/ISrRj0EAhzA/maxresdefault.jpg	#강아지 #말티즈 #말티푸 #강아지브이로그 안녕하세요. 여름이와 동동이입니다. 오늘은 이전 영상에서 여름이가 집에 오자마자 아팠던 이유를 영상으로 담아보았습니다.그때 당시 유튜브계획과 영상을 촬영할 정신이 없어 많은 장면이 들어가지는 못했으나 여름이는 이런 일도 있었구나 하고 봐주...	2023-01-02 00:00:37.962003+09
\.


--
-- Data for Name: lists; Type: TABLE DATA; Schema: public; Owner: resource
--

COPY public.lists (id, title, created_at) FROM stdin;
1002c24f-b60e-4c4f-9b61-912c0c83f08b	감성 플레이리스트	2022-12-28 14:11:51.104801+09
58fb45f8-3cf6-4a20-9e8c-306f4a0a9aae	아롱이의 수면음악	2022-12-28 14:12:11.302099+09
\.


--
-- Data for Name: lists_lists; Type: TABLE DATA; Schema: public; Owner: resource
--

COPY public.lists_lists (id, source_id, target_id, created_at) FROM stdin;
600f4345-36fa-46db-9ae4-53ac41e93e52	1002c24f-b60e-4c4f-9b61-912c0c83f08b	58fb45f8-3cf6-4a20-9e8c-306f4a0a9aae	2022-12-28 16:37:19.596633+09
\.


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: resource
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 1, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: resource
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: lists_lists lists_lists_pkey; Type: CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.lists_lists
    ADD CONSTRAINT lists_lists_pkey PRIMARY KEY (id);


--
-- Name: lists lists_pkey; Type: CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.lists
    ADD CONSTRAINT lists_pkey PRIMARY KEY (id);


--
-- Name: links links_list_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_list_id_foreign FOREIGN KEY (list_id) REFERENCES public.lists(id) ON DELETE CASCADE;


--
-- Name: lists_lists lists_lists_source_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.lists_lists
    ADD CONSTRAINT lists_lists_source_id_foreign FOREIGN KEY (source_id) REFERENCES public.lists(id) ON DELETE CASCADE;


--
-- Name: lists_lists lists_lists_target_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: resource
--

ALTER TABLE ONLY public.lists_lists
    ADD CONSTRAINT lists_lists_target_id_foreign FOREIGN KEY (target_id) REFERENCES public.lists(id);


--
-- PostgreSQL database dump complete
--

