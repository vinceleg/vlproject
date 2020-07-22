let profileModel = require('../models/profileData');


exports.getAllPosts = async (req, res, next) => {
    let id = req.params.profileID;

    let posts = await profileModel.userPosts(id);
    let profile = (await profileModel.getProfile(id))[0][0];
    
    //set number of posts user has
    let postNums = (await profileModel.numPosts(id))[0][0];
    profile.numPosts = postNums.numPosts;
    profileModel.updateNumPosts(id, postNums.numPosts);

    //set number of conversations user has
    let convosNums = (await profileModel.numConvos(id))[0][0];
    profile.numMessages = convosNums.numConvos;
    profileModel.updateNumMessages(id, convosNums.numConvos);

    //get all post ids
    let postIds = posts ? posts[0].map(function(v){ return v.postID; }) : [];

    //get all replies
    let replies = await profileModel.getRepliesToPostsByIds(postIds);
    
    //attach replies to each post
    posts[0].forEach(element => {
        element.replies = replies[element.postID];
        element.numReplies = replies[element.postID] ? replies[element.postID].length : 0;
    });


    res.render('all-posts-profile', {
        profile: profile,
        post: posts[0], 
        profileCSS: true
    }); 
}


exports.getRepliesToPost = (req, res, next) => {
    let postid = req.params.postID
    let replies = profileModel.postReplies(postid)
    replies.then( ([data, metadata]) => {
        res.send(data)
    })
}


exports.addNewPost = async (req, res) => {
    let id = req.session.profileID
    let title = req.body.posttitle
    let category = req.body.postcategory
    let content = req.body.postbody

    let image = await profileModel.profilePic(id)
    let imageurl = image[0][0].profileImage

    await profileModel.addPost(id, imageurl, title, category, content);

    res.redirect(`/profile/${id}`)
}

exports.addReply = async (req, res) => {
    let id = req.session.profileID
    let postId = req.params.postID
    let content = req.body.postBody

    let image = await profileModel.profilePic(id)
    let imageurl = image[0][0].profileImage

    await profileModel.replyToPost(postId, id, imageurl, content)

    res.redirect(`/profile/${id}`)
}