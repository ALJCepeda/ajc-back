CREATE TABLE Blogs (
  id SERIAL PRIMARY KEY,
  file text UNIQUE NOT NULL CHECK (file <> ''),
  image text NOT NULL CHECK (image <> ''),
  title text NOT NULL CHECK (title <> ''),
  description text NOT NULL CHECK (description <> ''),
  category text NOT NULL CHECK (category <> ''),
  tags text[] DEFAULT array[]::text[],
  created_at timestamp DEFAULT now()
);

CREATE TABLE Timeline (
  id SERIAL PRIMARY KEY,
  message text NOT NULL CHECK (message <> ''),
  image text NOT NULL CHECK (image <> ''),
  link_id integer,
  created_at timestamp DEFAULT now()
);

CREATE TABLE Links (
  id SERIAL PRIMARY KEY,
  url text NOT NULL CHECK (url <> ''),
  marker text NOT NULL CHECK (marker <> ''),
  enabled boolean DEFAULT TRUE
);
