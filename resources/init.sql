CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE Blogs (
  id SERIAL PRIMARY KEY,
  file text UNIQUE NOT NULL CHECK (file <> ''),
  image text NOT NULL CHECK (image <> ''),
  title text NOT NULL CHECK (title <> ''),
  description text NOT NULL CHECK (description <> ''),
  category text NOT NULL CHECK (category <> ''),
  tags text[] DEFAULT array[]::text[],
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON Blogs
FOR EACH ROW
EXECUTE PROCEDURE set_updated_at();
