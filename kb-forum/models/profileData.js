let db = require('../util/database');

function addPost(profileID, profileImage, title, category, content) {

    let sql = "INSERT into post (profileID, profileImage, postDate, title, category, content, numReplies) "
        + "values (?, ?, CURRENT_DATE(), ?, ?, ?, ?)";

    return db.query(sql,[
        profileID,
        profileImage,
        title,
        category,
        content,
        0
    ],function(error, results){});
}
const addReply = (postID, profileID, profileImage, content) => {
    let sql = "INSERT INTO reply (postID, profileID, profileImage, replyDate, content) "
    + "VALUES (?, ?, ?, CURRENT_DATE(), ?)";

    return db.query(sql,[
        postID,
        profileID,
        profileImage,
        content
    ],function(error, results){});
}
// used for addNewPost and add addReply in postController
const getProfileImage = (profileID) => {
    return db.execute(`SELECT profileImage FROM profile WHERE profileID=${profileID}`)
}

function getProfile(profileID) {
    return db.execute(`SELECT * FROM profile WHERE profileID=${profileID}`)
}

const verifyLogin = (email, password) => {
    return db.execute(`SELECT * FROM profile WHERE email='${email}' AND password='${password}'`)
}

const getAllPosts = () => {
    return db.execute("SELECT * FROM post ORDER BY postDate DESC")
}

const getUserPosts = (profileID) => {
    return db.execute(`SELECT * FROM post WHERE profileID='${profileID}' ORDER BY postDate DESC`)
}

const getLatestPosts = (skip, take) => {
    return db.execute("SELECT * FROM post ORDER BY postDate DESC LIMIT " + take + " OFFSET " + skip)
}

const getPostReplies = (postID) => {
    return db.execute(`SELECT * from reply WHERE postID=${postID} ORDER BY replyDate ASC`)
}

const getManyPostReplies = (postIDsArray) => {
    let sql = `SELECT * from reply WHERE postID IN (${postIDsArray}) ORDER BY replyDate ASC`;
    return db.execute(sql);
}



const addNewProfile = (first, last, email, pw, imgurl, about, dob, country) => {
    let sql = `INSERT INTO profile (firstName, lastName, email, password, profileImage, about, DOB, country, numLikes, numPosts, numMessages) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

    return db.query(sql,[
        first,
        last,
        email,
        pw,
        imgurl,
        about,
        dob,
        country,
        0, 
        0,
        0
    ],function(error, results){});
}

function editProfile(profileID, firstName, lastName, profileImage, country, DOB, about) {
    let sql = `UPDATE profile SET firstName = '${firstName}', lastName = '${lastName}', profileImage = '${profileImage}', country = '${country}', DOB = '${DOB}', about = '${about}' WHERE profileID = '${profileID}'`;

    return db.query(sql, [
        profileID,
        firstName,
        lastName,
        profileImage,
        country,
        DOB,
        about
    ],function(error, results){});
}

function editPost(profileID, profileImage) {
    let sql = `UPDATE post SET profileImage = '${profileImage}' WHERE profileID = '${profileID}'`;

    return db.query(sql, [
        profileID,
        profileImage,
    ],function(error, results){});
}

function editReply(profileID, profileImage) {
    let sql = `UPDATE reply SET profileImage = '${profileImage}' WHERE profileID = '${profileID}'`;

    return db.query(sql, [
        profileID,
        profileImage,
    ],function(error, results){});
}

const getNumPosts = (profileId) => {
    return db.execute(`SELECT COUNT(*) AS numPosts FROM post WHERE profileID=${profileId}`)
}

const updateNumPosts = (profileId, numPosts) => {
    return db.execute(`UPDATE profile SET numPosts = ${numPosts} WHERE profileID=${profileId}`)
}

const getNumConversations = (profileId) => {
    return db.execute(`SELECT COUNT(*) AS numConvos FROM conversation WHERE senderID=${profileId} OR receiverID=${profileId}`)
}

const updateNumMessages = (profileId, numConvos) => {
    return db.execute(`UPDATE profile SET numMessages = ${numConvos} WHERE profileID=${profileId}`)
}

const getSearchResults = (keywords) => {
    return db.execute("Select * from post WHERE title LIKE " + "'%" + keywords + "%' ORDER BY postDate DESC")
}

const getFilterResults = (category) => {
    return db.execute(`SELECT * FROM post WHERE category='${category}' ORDER BY postDate DESC`)
}

const addConversation = (senderID, receiverID, subject) => {
    let sql = `INSERT INTO conversation (senderID, receiverID, subject, convoDate) 
    VALUES (?, ?, ?, CURRENT_DATE())`

    return db.query(sql,[
        senderID, 
        receiverID, 
        subject
    ],function(error, results){})
}

const getAllConvos = (userID) => {
    // If user = sender, return receiver info, else return sender info
    return db.execute(`
    SELECT c.convoID, c.subject, DATE_SUB(c.convoDate, INTERVAL 7 HOUR) as convoDate,
    IF(c.senderID = ${userID}, s.profileID, r.profileID) as userID,
        IF(c.senderID = ${userID}, r.profileID, s.profileID) as profileID,
        IF(c.senderID = ${userID}, r.firstName, s.firstName) as firstName,
        IF(c.senderID = ${userID}, r.lastName, s.lastName) as lastName,
        IF(c.senderID = ${userID}, r.profileImage, s.profileImage) as profileImage
    FROM conversation c
    JOIN profile s ON s.profileID=c.senderID
    JOIN profile r ON r.profileID=c.receiverID
    WHERE s.profileID = ${userID} OR r.profileID = ${userID}
    ORDER BY convoDate ASC
    `)
}

const addMessage = (convoID, senderID, content) => {
    let sql = `INSERT INTO message (convoID, senderID, content, messageDate) 
    VALUES (?, ?, ?, CURRENT_TIMESTAMP())`

    return db.query(sql,[
        convoID, 
        senderID, 
        content
    ],function(error, results){})
}

const getAllMessagesInConversation = (convoId) => {
    return db.execute(`
    SELECT m.messageID, m.convoID, p.profileID, p.firstName, p.lastName, p.profileImage, 
        m.content, DATE_SUB(m.messageDate, INTERVAL 7 HOUR) as messageDate
    FROM message m
    JOIN profile p ON m.senderID=p.profileID
    WHERE convoID = ${convoId}
    ORDER BY messageDate ASC
    `)
}


const addLike = (profileID) => {
    return db.execute(`UPDATE profile SET numLikes = numLikes + 1 WHERE profileID='${profileID}'`)
}


//helper function

async function getRepliesToPosts(postIds){

    //get all replies for the posts on this page
    let replies = postIds.length > 0 ? await getManyPostReplies(postIds) : [];
    let repliesHasAny = replies && replies[0] && replies[0].length > 0;

    let repliesByPostIDs = [];

    if(repliesHasAny){
        //group replies based on post ID
        repliesByPostIDs = replies[0].reduce(function(map, obj) {
            let existingVal = map[obj.postID];
            
            let val = new Array();
            if(existingVal){
                val = existingVal;
            }
    
            val.push(obj);
    
            map[obj.postID] = val;
            return map;
        }, {});
    }

    return repliesByPostIDs;
}

const getEmail = (profileID) => {
    return db.execute(`SELECT email FROM profile WHERE profileID=${profileID}`)
}



module.exports = {
    getProfile : getProfile,
    allPosts : getAllPosts,
    getLatestPosts: getLatestPosts,
    addPost: addPost,
    postReplies : getPostReplies,
    getManyPostReplies: getManyPostReplies,
    login : verifyLogin,
    newProfile : addNewProfile,
    editProfile : editProfile,
    editPost : editPost,
    editReply : editReply,
    numPosts : getNumPosts,
    updateNumPosts: updateNumPosts,
    numConvos : getNumConversations,
    updateNumMessages: updateNumMessages,
    search : getSearchResults,
    filter : getFilterResults,
    addConvo : addConversation,
    allConvos : getAllConvos,
    addMessage : addMessage,
    allConvoMessages : getAllMessagesInConversation,
    addLike: addLike,
    userPosts: getUserPosts,
    getRepliesToPostsByIds: getRepliesToPosts,
    email: getEmail,
    profilePic: getProfileImage,
    replyToPost: addReply,
}
