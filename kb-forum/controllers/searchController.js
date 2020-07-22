let profileModel = require('../models/profileData');

exports.searchPosts = (req,res,next) => {
    let keywords = req.body.searched_words;
    let results = profileModel.search(keywords);
    results.then(([data, metadata]) => {
        res.render('searched-posts', {
            post: data,
            profileCSS: true
        })
    })
}

exports.filterPosts = (req,res) => {
    let topic = req.body.postcategory

    let results = profileModel.filter(topic)
    results.then( ([data, metadata]) => {
        res.render('searched-posts', {
            post: data,
            profileCSS: true
        })
    })

}