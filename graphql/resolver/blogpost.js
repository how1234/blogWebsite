const BlogPost = require('../../models/blogPost')

const User = require('../../models/user')

const {transfromBlogpost} = require('./merge')
module.exports = {
    blogPosts: async () => {
        try{
            const blogPosts = await BlogPost.find();
            return blogPosts.map(blogpost => {
                return {
                    ...blogpost._doc,
                    _id: blogpost.id,
                    date:blogpost._doc.date,
                    author:user.bind(this,blogpost._doc.author)
                }
            })
        }catch(err){
            throw err
        }
   
    },
    createBlogPost: async (args,req) => {
      if(!req.isAuth){
        
        throw new Error("Unauthentificated!")
      }
      console.log(req.isAuth)
      const blogPost = new BlogPost({
        title: args.blogPostInput.title,
        description: args.blogPostInput.description,
        date: new Date(),
        author:req.userId
      });
     

      try{
        const result = await blogPost.save()
        let createdBlogPost = transfromBlogpost(result)
        
        const author = await User.findById(req.userId);

        if(!author){
          throw new Error("User not found")
        }
        author.createdBlogPosts.push(createdBlogPost)
        await author.save()
        return createdBlogPost
      }catch(err){
        throw err
      }
    

      
    }
}