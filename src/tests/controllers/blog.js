import path from 'path';
import BlogController from './../../controllers/blog';

const blogURL = path.resolve(`${__dirname}/../mocks/blogs`);
var blogController;

beforeEach(() => {
  blogController = new BlogController(blogURL);
});

fdescribe('Blog controller', () => {
  it('should parse directory to get blogs', (done) => {
    blogController.getBlogs().then((result) => {
      expect(result).toEqual([
        'Test.html',
        'dir/dir2/test2.html'
      ]);

      done();
    });
  });

  it('should read blog', (done) => {
    blogController.readBlog('dir/dir2/test2.html').then((result) => {
      expect(result).toEqual(`Hello from Test2.html\r\n`);

      done();
    });
  });

  it('should parse blog', () => {
    const html = `
      <head>
        <meta name='title' content='This is a test'>
        <meta name='description' content='This is a description'>
        <meta name='tags' content='test,tag'>
        <meta name='category' content='general'>
      </head>

      <h1>Hello from Test.html</h1>
    `;
    const result = blogController.parseBlog(html);

    expect(result.meta).toEqual({
      title: 'This is a test',
      description: 'This is a description',
      tags: [ 'test', 'tag' ],
      category: 'general'
    });
    expect(result.html).toEqual(html);
  });

  it('should parse directory for blog meta data', (done) => {
    blogController.gatherBlogMeta().then((result) => {
      expect(result).toEqual({
        'Test.html': {
          meta: {
            title: 'This is a test',
            description: 'This is a description',
            tags: ['test','tag'],
            category: 'general'
          },
          html: '<head>\n  <meta name=\'title\' content=\'This is a test\'>\n  <meta name=\'description\' content=\'This is a description\'>\n  <meta name=\'tags\' content=\'test,tag\'>\n  <meta name=\'category\' content=\'general\'>\n</head>\n\n<h1>Hello from Test.html</h1>\n' },
        'dir/dir2/test2.html': {
          meta: {},
          html: 'Hello from Test2.html\r\n'
        }
      });

      done();
    });
  });
});
