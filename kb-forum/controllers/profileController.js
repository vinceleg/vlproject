let profileModel = require('../models/profileData');

var skip = 0;
var take = 5;

/**
 * Serves as both GET and POST method. 
 * If GET, skip and take are defaulted to 0 and 5. (first time loading the page)
 * If POST, the specific skip and take values will be sent to this method & used in place of defaults.
 * 
 * Big method does several things in one:
 * 
 * 1. Retrieves profile information
 * 2. Retrieves recent discussion posts
 * 3. Retrieves recent discussion posts replies
 * 
 */
exports.getProfile = async (req,res,next) => {
    let id = req.params.profileID;

    //if previous button was clicked, attempt to decrement skip value (never below 0 !)
    if(req.body.previous) {
        let val = skip - take;
        if(val >= 0){
            skip = val;
        }
    } else if(req.body.next) { //if next button was clicked, increment skip
        skip += take;
    }
    
    
    //get profile info
    let profile = (await profileModel.getProfile(id))[0][0];
    
    //set number of posts user has
    let postNums = (await profileModel.numPosts(id))[0][0];
    profile.numPosts = postNums.numPosts;
    profileModel.updateNumPosts(id, postNums.numPosts);
    
    //set number of conversations user has and update database
    let convosNums = (await profileModel.numConvos(id))[0][0];
    profile.numMessages = convosNums.numConvos;
    profileModel.updateNumMessages(id, convosNums.numConvos);

    //store user's name in session
    req.session.fullName = `${profile.firstName} ${profile.lastName}`

    //get all recent posts on this page
    let discussion = await profileModel.getLatestPosts(skip, take);
    let discussionHasAny = discussion && discussion[0] && discussion[0].length > 0;


    let disablePrevBtn = skip == 0 ? true : false;
    let disableNextBtn = !discussionHasAny;

    //get all post ids
    let postIds = discussionHasAny ? discussion[0].map(function(v){ return v.postID; }) : [];

    //get all replies for the posts on this page
    let replies = await profileModel.getRepliesToPostsByIds(postIds);

    let posts = discussion[0];
    
    //attach replies to each post
    posts.forEach(element => {
        element.replies = replies[element.postID];
        element.numReplies = replies[element.postID] ? replies[element.postID].length : 0;
    });
    

    //finally grab all that data & pass to front end
    res.render('main-profile', 
        { 
            profileId: id,
            profile: profile,
            post: posts,
            profileCSS: true ,
            disablePrev: disablePrevBtn,
            disableNext: disableNextBtn
        }
    );


}

exports.getUserProfile = async (req,res,next) => {
    let id = req.params.profileID;
    
    let allUserPosts = await profileModel.userPosts(id);
    let hasposts = allUserPosts && allUserPosts[0] && allUserPosts[0].length > 0;

    //get all post ids
    let postIds = hasposts ? allUserPosts[0].map(function(v){ return v.postID; }) : [];

    //get all replies for the posts on this page
    let replies = await profileModel.getRepliesToPostsByIds(postIds);

    let posts = allUserPosts[0];

    //attach replies to each post
    posts.forEach(element => {
        element.replies = replies[element.postID];
        element.numReplies = replies[element.postID] ? replies[element.postID].length : 0;
    });

    
    let profile = await profileModel.getProfile(id);

    res.render('user-profile', 
            { 
                profile: profile[0][0],
                post: posts,
                profileCSS: true ,
                disablePrev: true
            });
}

exports.addLike = async (req,res,next) => {
    let id = req.params.profileID;
    await profileModel.addLike(id);
    res.redirect(`/profile/user/${id}`);
}

exports.createNewMessage = (req, res) => {
    let id = req.params.profileID;
    req.session.receiverID = id; //receiverid saved to session

    let Profile = profileModel.getProfile(id);
    Profile.then(([data, metadata]) =>{
        res.render('new-message',
            {
                profile: data[0],
                profileCSS: true,
                messageCSS: true,
                disablePrev: true
            });
    });
}

exports.getEditProfile = (req,res,next) => {
    let id = req.params.profileID;
    
    let Profile = profileModel.getProfile(id);
    Profile.then(([data, metadata]) => {
        res.render('edit-profile', 
            { 
                profile: data[0],
                profileCSS: true
            });
   });
}

exports.postEditProfile = (req, res, next) => {
    let profileID = req.params.profileID;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let profileImage = req.body.profileImage;
    let country = req.body.country;
    let DOB = req.body.DOB;
    let about = req.body.about;
    
    let newProfile = profileModel.editProfile(profileID, firstName, lastName, profileImage, country, DOB, about);
    newProfile = profileModel.editPost(profileID, profileImage);
    newProfile = profileModel.editReply(profileID, profileImage);

    newProfile.then( ([data, metadata]) => {
        res.redirect(`/profile/${profileID}`)
    });
}