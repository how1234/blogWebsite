const authResolver = require('./auth');
const blogPostsResolver = require('./blogpost');


const rootResolver = {
    ...authResolver,
    ...blogPostsResolver 
}
module.exports = rootResolver