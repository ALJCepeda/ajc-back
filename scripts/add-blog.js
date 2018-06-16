const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const inquirer = require('inquirer');

const pool = require('./../dist/config');
const pg = require('./../dist/services/pg').default;

const insert = function(data) {
  (async () => {
    const client = await pg.pool.connect();

    try {
      console.log('Publishing blog');
      await client.query('BEGIN');
      const { rows:blogRows } = await client.query(`
        INSERT INTO blogs(template, image, title, description, category, tags)
        VALUES($1::text, $2::text, $3::text, $4::text, $5::text, $6::text[])
        ON CONFLICT(template)
        DO UPDATE SET
          image = excluded.image,
          title = excluded.title,
          description = excluded.description,
          category = excluded.category,
          tags = excluded.tags
        RETURNING id
      `, [ data.template, data.image, data.title, data.description, data.category, data.tags ]);

      await client.query(`
        INSERT INTO timeline_blogs(message, blog_id)
        VALUES($1::text, $2::integer)
        ON CONFLICT(blog_id)
        DO UPDATE SET
          message = excluded.message
      `, [ data.timeline, blogRows[0].id ]);

      for(const url of data.urls) {
        await client.query(`
          INSERT INTO blog_urls(url, blog_id)
          VALUES($1::text, $2::integer)
          ON CONFLICT(url)
          DO UPDATE SET
            blog_id = excluded.blog_id
        `, [ url, blogRows[0].id ]);
      }

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
};

const loopQuestion = function(question, condition, answers) {
  const name = question.name;
  return inquirer.prompt([ question ]).then(answer => {
    if(answer[name] === condition) {
      return answers;
    }

    answers[name].push(answer[name]);
    return loopQuestion(question, condition, answers);
  });
};

const inquireWhile = function(firstQuestion, condition, whileQuestion) {
  const name = firstQuestion.name;
  const answers = {};
  answers[name] = [];

  firstQuestion.message = firstQuestion.message + ' (enter nothing to commit)';

  if(!_.isString(condition)) {
    condition = '';
  }

  if(!_.isObject(whileQuestion)) {
    whileQuestion = {
      type:'input',
      name:name,
      message: '?'
    }
  };

  return inquirer.prompt([ firstQuestion ]).then(answer => {
    if(answer[name] === condition) {
      return answers;
    }

    answers[name].push(answer[name]);
    return loopQuestion(whileQuestion, condition, answers);
  });
};

const insertWithFile = function() {
  return inquirer.prompt([
    {
      type:'input',
      name:'file',
      message:'Where is the file?'
    }
  ]).then(answers => {
    fs.readFile(answers.file, 'utf-8', (err, content) => {
      if(err) return console.log(err);

      const data = yaml.safeLoad(content);
      insert(data);
    });
  });
};

const insertWithPrompt = function() {
  return inquirer.prompt([
    {
      type:'input',
      name:'template',
      message:'template?'
    }, {
      type:'input',
      name:'image',
      message:'image?'
    }, {
      type:'input',
      name:'title',
      message:'title?'
    }, {
      type:'input',
      name:'description',
      message:'description?'
    }, {
      type:'input',
      name:'category',
      message:'category?'
    }, {
      type:'input',
      name:'timeline',
      message:'timeline?'
    }
  ]).then(answers => {
    return inquireWhile({
      type:'input',
      name:'tags',
      message:'tags?'
    }).then(tagAnswers => {
      return { ...answers, ...tagAnswers };
    });
  }).then(answers => {
    return inquireWhile({
      type:'input',
      name:'urls',
      message:'urls?'
    }).then(urlAnswers => {
      return { ...answers, ...urlAnswers };
    });
  }).then(insert);
};

inquirer.prompt([
  {
    type:'list',
    name:'insert',
    message:'How you like to add the blog?',
    choices:[ 'file', 'prompt' ]
  }
]).then(answer => {
  switch(answer.insert) {
    case 'prompt':
      insertWithPrompt();
    break;
    case 'file':
      insertWithFile();
    break;
    default:
      throw new Error('Unrecognized insert type');
    break;
  }
});
