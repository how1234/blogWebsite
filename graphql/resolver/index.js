const authResolver = require('./auth');
const blogPostsResolver = require('./blogpost');
const tagResolver = require('./tag')


const rootResolver = {
    ...authResolver,
    ...blogPostsResolver,
    ...tagResolver
}
module.exports = rootResolver