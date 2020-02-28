const BlogPost = require('../../models/blogPost')
const User = require('../../models/user')

const {dateToString} = require('../../helper/date')

const blogPosts = async postIds=> {
    try{
        const foundBlogPosts =  await BlogPost.find({_id:{$in:postIds}})
        return foundBlogPosts.map(blogPost => {
            return transfromBlogpost(blogPost)
        })
    }catch(err){
        throw err
    }
}

const singleBlogPosts = async postId => {
    try{
        const foundBlogPost = await BlogPost.findById({_id:postId})
        return transfromBlogpost(foundBlogPost)
    }catch(err){
        throw err
    }
}
const singleUser = async userId =>{
    try {
        const user = await User.findById(userId)
        return {
            ...user._doc,
            _id:user.id,
            createdBlogPosts: blogPosts.bind(this,user._doc.createdBlogPosts)
        };

    }catch(err){
        throw err;
    }
}


const transfromBlogpost = blogPost => {
    return {
        ...blogPost._doc,
        _id:blogPost.id,
        date:dateToString(blogPost._doc.date),
        creator: singleUser.bind(this,blogPost._doc.creator)
    };
}

exports.transfromBlogpost = transfromBlogpost
exports.singleUser = singleUser
