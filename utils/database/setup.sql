create table
    public.account (
        id uuid not null default gen_random_uuid (),
        name character varying not null,
        pass character varying not null,
        display character varying not null,
        constraint User_pkey primary key (id)
    ) tablespace pg_default;

create table
    public.joke (
        joke_id uuid not null default gen_random_uuid (),
        user_id uuid not null,
        time timestamp with time zone not null default now(),
        content text not null,
        image text not null default ''::text,
        is_error boolean not null default true,
        constraint Joke_pkey primary key (joke_id),
        constraint public_joke_user_id_fkey foreign key (user_id) references account (id)
    ) tablespace pg_default;

create table
    public.peak_room (
        id uuid not null default gen_random_uuid (),
        created_at timestamp with time zone not null default now(),
        updated_at timestamp with time zone not null default now(),
        host_name character varying not null,
        host_address character varying not null,
        host_pass character varying not null,
        title character varying not null,
        pass character varying not null,
        summary text not null,
        is_error boolean not null default true,
        constraint room_pkey primary key (id)
    ) tablespace pg_default;

create table
    public.peak (
        peak_id uuid not null default gen_random_uuid (),
        room_id uuid not null,
        time timestamp with time zone not null default now(),
        name character varying not null,
        address character varying not null,
        pass character varying not null,
        content text not null,
        is_error boolean not null default true,
        constraint peak_pkey primary key (peak_id, room_id),
        constraint public_peak_room_id_fkey foreign key (room_id) references peak_room (id)
    ) tablespace pg_default;
