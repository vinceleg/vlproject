let profileModel = require('../models/profileData')

exports.verifyLogin = (req,res) => {
    let email = req.body.email;
    let password = req.body.password;

    let profileId = profileModel.login(email, password)
    profileId.then( ([data, metadata]) => {
        if (data.length == 0) {
            res.send("Invalid email and/or password.")
        } else {
            req.session.profileID = data[0].profileID;
            res.redirect(`/profile/${data[0].profileID}`)
        }
    })
}

var newUser = []
exports.createNewProfile = (req,res) => {

    req.session.newfname = req.body.firstname
    req.session.newlname = req.body.lastname
    req.session.newEmail = req.body.email
    req.session.newPW = req.body.password
    console.log("registering part 1");
    res.render('signup', {
        signupCSS: true,
        layout: 'login-layout.hbs'
    })
}

exports.confirmNewProfile = (req,res) => {
    let fname = req.session.newfname
    let lname = req.session.newlname
    let email = req.session.newEmail
    let pw = req.session.newPW
    let url = req.body.imageurl
    let about = req.body.about
    let dob = req.body.dob
    let country = req.body.country

    let profile = profileModel.newProfile(fname, lname, email, pw, url, about, dob, country)
    profile.then( ([data, metadata]) => {
        let profileId = data.insertId;
        req.session.profileID = profileId;
        res.redirect(`/profile/${profileId}`)
    })
}

exports.logoutUser = (req,res) => {
    req.session.destroy((err) => res.redirect('/'))
}