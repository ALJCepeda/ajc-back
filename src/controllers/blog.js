import pool from './../services/pg.js';

export default {
  manifest: (req, res) => {
    pool.connect((err, client, release) => {
      if (err) {
        res.status(500).send('This will be fixed soon!');
        return console.error('Error acquiring client', err.stack)
      }

      client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
          res.status(500).send('This will be fixed soon!');
          return console.error('Error executing query', err.stack)
        }

        res.send(result.rows);
      })
    });
  },
  get: (req, res) => {

  }
};
