let profileModel = require('../models/profileData')
let emailController = require('./emailController')

exports.addConversation = (req,res) => {
    let senderID = req.session.profileID
    let receiverID = req.session.receiverID
    let subject = req.body.subject
    let content = req.body.message
    
    emailController.sendEmail(req, res); //Sends an email to message recipient

    let convo = profileModel.addConvo(senderID, receiverID, subject)
    convo.then( ([data, metadata]) => {
        let convoID = data.insertId
        let message = profileModel.addMessage(convoID, senderID, content)
        message.then( ([data, metadata]) => {
            res.redirect(`/profile/user/${receiverID}`)
        })
    })
}

exports.getAllConversations = (req,res) => {
    let userID = req.session.profileID   // ID of current user
    
    let convos = profileModel.allConvos(userID)
    convos.then( ([data, metadata]) => {
        res.render('all-conversations', {
            conversation: data,
            messageCSS: true
        })
    })
}

exports.addMessage = (req,res) => {
    let convoId = req.session.convoId
    let senderId = req.session.profileID
    let content = req.body.content

    let message = profileModel.addMessage(convoId, senderId, content)

    message.then( ([data, metadata]) => {
        res.redirect(`/conversations/${convoId}`)
    })
}

exports.getAllMessagesInConvo = async (req,res) => {
    let convoId = req.params.convoID
    let profileId = req.session.profileID
    req.session.convoId = convoId

    let messages = await profileModel.allConvoMessages(convoId)

    let convos = await profileModel.allConvos(profileId)
    res.render('all-messages-profile', {
        messageCSS: true,
        conversation: convos[0],
        message: messages[0]
    })

}
