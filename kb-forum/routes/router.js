const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const profileController = require('../controllers/profileController');
const postController = require('../controllers/postController')
const searchController = require('../controllers/searchController')
const messageController = require('../controllers/messageController')

// PROFILE
router.route('/profile/:profileID')
  .get(profileController.getProfile)
  .post(profileController.getProfile);
router.get('/profile/user/:profileID', profileController.getUserProfile);
router.get('/addLike/:profileID', profileController.addLike);
router.get('/profile/user/:profileID/newMessage', profileController.createNewMessage)
router.get('/profile/edit/:profileID', profileController.getEditProfile);  
router.post('/edit/:profileID', profileController.postEditProfile);

// LOGIN
router.post('/login', loginController.verifyLogin)
router.post('/signup', loginController.createNewProfile)
router.post('/confirm-signup', loginController.confirmNewProfile)
router.get('/logout', loginController.logoutUser)

// POST
router.get('/allposts/:profileID', postController.getAllPosts)
router.get('/post/:postID', postController.getRepliesToPost)
router.post('/newPost', postController.addNewPost);
router.post('/reply/:postID', postController.addReply)

// SEARCH
router.post('/search', searchController.searchPosts)
router.post('/filter', searchController.filterPosts)

// MESSAGE
router.get('/conversations', messageController.getAllConversations)
router.post('/addConversation', messageController.addConversation) 
router.post('/addMessage', messageController.addMessage)
router.get('/conversations/:convoID', messageController.getAllMessagesInConvo) //replaced message/:convoID

module.exports = router;