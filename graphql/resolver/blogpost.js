const BlogPost = require('../../models/blogPost')

const User = require('../../models/user')


module.exports = {
    blogPosts: async () => {
        try{
            const blogPosts = await BlogPost.find();
            return blogPosts.map(blogpost => {
                return {
                    ...blogpost._doc,
                    _id: blogpost.id,
                    date:blogpost._doc.date,
                    creator:user.bind(this,blogpost._doc.creator)
                }
            })
        }catch(err){
            throw err
        }
   
    },
    createBlogPost: async (args) => {
      const blogPost = new BlogPost({
        title: args.blogPostInput.title,
        description: args.blogPostInput.description,
        date: new Date()
      });

      return blogPost
        .save()
        .then(result => {
          console.log(result);
          return { ...result._doc, _id: result.id };
        })
        .catch(err => {
          console.log(err);
        }); //It's a promise if return it
    }
}