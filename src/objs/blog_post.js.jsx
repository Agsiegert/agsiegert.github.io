import BlogPostNavigation from 'components/blog_post/blog_post_navigation';
import BlogPostAuthor from 'components/blog_post/blog_post_author';

const BaseBlogPost = Scrivito.createObjClass({
  name: 'BlogPost',
  attributes: {
    author: 'reference',
    body: ['widgetlist', { only: 'SectionWidget' }],
    publishedAt: 'date',
    subtitle: 'string',
    tags: 'stringlist',
    title: 'string',
    titleImage: 'reference',
  },
});

class BlogPost extends BaseBlogPost {
  navigationOptions() {
    let backgroundImage = this.get('titleImage');
    if (!backgroundImage) {
      const blog = Scrivito.Obj.getByPermalink('blog');
      if (blog) {
        backgroundImage = blog.get('navigationBackgroundImage');
      }
    }

    return {
      navigationStyle: 'transparentDark',
      backgroundImage: backgroundImage || null,
      heigthClassName: null,
    };
  }
}

Scrivito.registerClass('BlogPost', BlogPost);

Scrivito.provideUiConfig(BlogPost, {
  title: 'BlogPost',
  description: 'A BlogPost.',
  attributes: {
    author: {
      title: 'Author',
      description: 'The author of the blogpost.',
    },
    publishedAt: {
      title: 'Published At',
      description: 'When will this BlogPost be published.',
    },
    titleImage: {
      title: 'Title image',
      description: 'The title image of the blogpost',
    },
    tags: {
      title: 'Tags',
      description: 'The tags of the blogpost',
    },
  },
  titleForContent: obj => obj.get('title'),
});

const BlogPostTagList = Scrivito.createComponent(({ tags }) =>
  <section className="bg-nav-content">
    <div className="container">
      <div className="nav-centered">
        <ul className="nav nav-pills">
          {
            tags.map(tag => <li key={ tag } role="presentation"><a href="#">{ tag }</a></li>)
          }
        </ul>
      </div>
    </div>
  </section>
);

const BlogPostMorePosts = Scrivito.createComponent(({ author }) => {
  if (!author) { return null; }
  if (author.objClass !== 'Author') { return null; }

  return (
    <section className="bg-white">
      <div className="container gutter0">
        <h1 className="h2 border-bottom">More great blog posts from { author.get('name') }</h1>
      </div>
    </section>
  );
});

Scrivito.provideComponent(BlogPost, obj =>
  <div>
    <BlogPostNavigation currentPost={ obj }/>
    <section className='bg-white'>
      <div className='container'>
        <Scrivito.React.Content tag="h1" className="h2" content={ obj } attribute="title" />
        <Scrivito.React.Content tag="h2" className="h4" content={ obj } attribute="subtitle" />
      </div>
    </section>
    <Scrivito.React.Content tag="div" content={ obj } attribute="body" />
    <BlogPostAuthor author={ obj.get('author') } />
    <BlogPostTagList tags={ obj.get('tags') } />
    <BlogPostMorePosts author={ obj.get('author') } />
  </div>
);

export default BlogPost;
