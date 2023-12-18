const { postModel } = require('../../models/post');

module.exports = (request, response) => {
    postModel
        .find({}, 'tags')
        .then(posts => {
            let allTags = []
            // Concatenate all the tags arrays in one array
            posts.forEach(post => {
                allTags = allTags.concat(post.tags)
            })
            // Remove duplicates by converting to Set and back to Array
            const uniqueTags = Array.from(new Set(allTags))

            response.status(200).json({
                tags: uniqueTags
            })
        }).catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error trying to list the tags'
            })
        })
}