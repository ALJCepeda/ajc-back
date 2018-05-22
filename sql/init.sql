CREATE TABLE Blogs (
  id SERIAL PRIMARY KEY,
  file text UNIQUE NOT NULL CHECK (file <> ''),
  image text NOT NULL CHECK (image <> ''),
  title text NOT NULL CHECK (title <> ''),
  description text NOT NULL CHECK (description <> ''),
  category text NOT NULL CHECK (category <> ''),
  tags text[] DEFAULT array[]::text[],
  created_at timestamp DEFAULT (now() at time zone 'utc')
);

CREATE TABLE Links (
  id SERIAL PRIMARY KEY,
  url text UNIQUE NOT NULL CHECK (url <> ''),
  marker text NOT NULL CHECK (marker <> ''),
  enabled boolean DEFAULT TRUE,
  created_at timestamp DEFAULT (now() at time zone 'utc')
);

CREATE TABLE Timeline (
  id SERIAL PRIMARY KEY,
  message text NOT NULL CHECK (message <> ''),
  image text NOT NULL CHECK (image <> ''),
  link_id integer REFERENCES Links(id),
  blog_id integer UNIQUE REFERENCES Blogs(id),
  created_at timestamp DEFAULT (now() at time zone 'utc')
);
