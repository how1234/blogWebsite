const BlogPost = require("../../models/blogPost");

const User = require("../../models/user");
const Tag = require('../../models/tag');

const { transfromBlogpost, singleUser } = require("./merge");
module.exports = {
  blogPosts: async (_, req) => {
    try {
      const blogPosts = await BlogPost.find();
      
      return blogPosts.map(blogpost => {
        return {
          _id: blogpost.id,
          date: blogpost._doc.date,
          title: blogpost._doc.title,
          tags: blogpost._doc.tags,
          creator: singleUser(blogpost._doc.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  },
  getBlogPost: async (input, req) => {
    try {
      const result = await BlogPost.findById(input._id);
      return {
        ...result._doc
      };
    } catch (err) {
      throw err;
    }
  },
 
  createBlogPost: async (input, req) => {
    try {
      
      const tags = input.blogPostInput.tags
      console.log(tags)
      const blogPost = new BlogPost({
        title: decodeURIComponent(input.blogPostInput.title),
        text: decodeURIComponent(input.blogPostInput.text),
        tags: tags,
        date: new Date(),
        creator: req.get("userId")
      });
 

      const result = await blogPost.save();

      let createdBlogPost = transfromBlogpost(result);

      const author = await User.findById(req.get("userId"));

  

      for (let i in tags){
        let tagResult = await Tag.find({name:tags[i]})
        if(tagResult && tagResult[0]){
          tagResult[0].relatedBlogPosts.push(createdBlogPost)
          await tagResult[0].save()
        }
      }
      
      if (!author) {
        throw new Error("User not found");
      }
      author.createdBlogPosts.push(createdBlogPost);
      await author.save();
      return createdBlogPost;
    } catch (err) {
      throw err;
    }
  },
  removeBlogPost: async (input,req) =>{
    try{
      const result = await BlogPost.deleteOne({_id:input._id}) //A object
      const author = await User.findById(req.get("userId"));
      const filteredBlogPosts = author.createBlogPosts.filter( element => element._id !=  input._id)


      author.createdBlogPosts = filteredBlogPosts
      author.save()
      return JSON.stringify(result)
    }catch(err){
      throw err
    }
    

  }
};
