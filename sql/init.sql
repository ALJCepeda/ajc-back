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

CREATE TABLE blog_urls (
  id SERIAL PRIMARY KEY,
  blog_id integer NOT NULL REFERENCES blogs(id),
  url text UNIQUE NOT NULL CHECK (url <> '')
);

CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  name text UNIQUE NOT NULL CHECK (name <> ''),
  url text UNIQUE NOT NULL CHECK (url <> ''),
  marker text NOT NULL CHECK (marker <> ''),
  enabled boolean DEFAULT TRUE,
  created_at timestamp DEFAULT (now() at time zone 'utc')
);

CREATE TABLE timeline_blogs (
  id SERIAL PRIMARY KEY,
  message text NOT NULL CHECK (message <> ''),
  blog_id integer UNIQUE NOT NULL REFERENCES blogs(id),
  created_at timestamp DEFAULT (now() at time zone 'utc')
);
