import pool from '../libs/pg';

const LinksDB = {
  get(name) {
    return pool.query('SELECT name, url, marker FROM Links WHERE name=$1::text', [ name ]).then((blob) => {
      if(blob.rows.length === 0) {
        return null;
      }

      return blob.rows[0];
    });
  }
};

export default LinksDB;
