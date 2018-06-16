const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const inquirer = require('inquirer');

const config = require('./../dist/config');
const pg = require('./../dist/services/pg').default;

inquirer.prompt([
  {
    type:'input',
    name:'name',
    message:'name?'
  }, {
    type:'input',
    name:'url',
    message:'url?'
  }, {
    type:'input',
    name:'marker',
    message:'marker?'
  }
]).then(answers => {
  (async () => {
    const client = await pg.pool.connect();

    try {
      console.log('Adding link');

      const { rows } = await client.query(`
        INSERT INTO Links(name, url, marker)
        VALUES($1::text, $2::text, $3::text)
        ON CONFLICT(url)
        DO UPDATE SET
          name = excluded.name,
          marker = excluded.marker
        RETURNING id
      `, [ answers.name, answers.url, answers.marker ]);

      console.log(`Link added: ${rows[0].id}`);
    } finally {
      client.release();
      pg.pool.end();
    }
  })().catch(e => console.error(e.stack));
});
