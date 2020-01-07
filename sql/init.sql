CREATE EXTENSION "uuid-ossp";

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  template text UNIQUE NOT NULL CHECK (template <> ''),
  image text NOT NULL CHECK (image <> ''),
  title text NOT NULL CHECK (title <> ''),
  description text NOT NULL CHECK (description <> ''),
  category text NOT NULL CHECK (category <> ''),
  tags text[] DEFAULT array[]::text[],
  created_at timestamp DEFAULT (now() at time zone 'utc')
);

CREATE TABLE blog_uris (
  id SERIAL PRIMARY KEY,
  blog_id integer NOT NULL REFERENCES blogs(id),
  uri text UNIQUE NOT NULL CHECK (uri <> ''),
  isPrimary boolean DEFAULT false,
  UNIQUE (blog_id, isPrimary)
);

CREATE UNIQUE INDEX one_primary_index ON blog_uris (blog_id, isPrimary)
WHERE isPrimary = true;

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  name text UNIQUE NOT NULL CHECK (name <> ''),
  url text UNIQUE NOT NULL CHECK (url <> ''),
  marker text NOT NULL CHECK (marker <> ''),
  enabled boolean DEFAULT TRUE,
  created_at timestamp DEFAULT (now() at time zone 'utc')
);

CREATE TABLE timeline_blogs (
  id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  message text NOT NULL CHECK (message <> ''),
  blog_id integer UNIQUE NOT NULL REFERENCES blogs(id),
  created_at timestamp DEFAULT (now() at time zone 'utc')
);

CREATE TABLE timeline (
  id uuid DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
  message text NOT NULL CHECK (message <> ''),
  image text NOT NULL CHECK (image <> ''),
  link text,
  link_label text,
  created_at timestamp DEFAULT (now() at time zone 'utc')
);

CREATE VIEW all_timelines AS
(
  SELECT id, message, image, created_at, link, link_label, 'post' as type, 'Alfred Cepeda' as name
  FROM timeline

  UNION

  SELECT tb.id, message, image, b.created_at, concat('blogs/', bu.uri) as link, b.title as link_label, 'blog' as type, 'Alfred Cepeda' as name
  FROM timeline_blogs AS tb
  JOIN blogs AS b ON ( b.id = tb.blog_id)
  JOIN blog_uris AS bu ON ( b.id = bu.blog_id)
  WHERE
    bu.isPrimary = true
);
