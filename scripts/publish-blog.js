const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const pool = require('./../dist/config');
const pg = require('./../dist/services/pg').default;

const args = process.argv.slice(2);
const file = path.normalize(`${__dirname}/../${args[0]}`);

if(!_.isString(file)) {
  console.log('Must enter location of JSON file');
  process.exit();
}

fs.readFile(file, 'utf-8', (err, content) => {
  if(err) return console.log(err);

  const data = yaml.safeLoad(content);

  (async () => {
    const client = await pg.pool.connect();

    try {
      console.log('Publishing blog');
      await client.query('BEGIN');
      const { rows:blogRows } = await client.query(`
        INSERT INTO Blogs(file, image, title, description, category, tags)
        VALUES($1::text, $2::text, $3::text, $4::text, $5::text, $6::text[])
        ON CONFLICT(file)
        DO UPDATE SET
          image = excluded.image,
          title = excluded.title,
          description = excluded.description,
          category = excluded.category,
          tags = excluded.tags
        RETURNING id
      `, [ data.file, data.image, data.title, data.description, data.category, data.tags ]);

      const { rows:linkRows } = await client.query(`
        INSERT INTO Links(url, marker)
        VALUES($1::text, $2::text)
        ON CONFLICT(url)
        DO UPDATE SET
          marker = excluded.marker
        RETURNING id
      `, [ data.file, data.marker ]);

      await client.query(`
        INSERT INTO Timeline(message, image, link_id, blog_id)
        VALUES($1::text, $2::text, $3::integer, $4::integer)
        ON CONFLICT(blog_id)
        DO UPDATE SET
          message = excluded.message,
          image = excluded.image,
          link_id = excluded.link_id
      `, [ data.timeline, data.image, linkRows[0].id, blogRows[0].id ]);

      await client.query('COMMIT');
      console.log('Finished publishing blog');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
      pg.pool.end();
    }
  })().catch(e => console.error(e.stack))
});
