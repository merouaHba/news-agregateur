const Article = require('../models/articleModel');
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors');
const { apiFeatures } = require('../utils');
const { default: mongoose } = require('mongoose');

// Get all articles
const getAllArticles = async (req, res) => {

    const result = await apiFeatures(req, Article);

    res.status(StatusCodes.OK).json({ ...result });

   
};


// Mark article as read
const markAsRead = async (req, res) => {
    const { _id } = req.user
    const articleId = req.params.id;

    const article = await Article.findById(articleId);
        if (!article) {
           throw new BadRequestError('Article not found')
    }
    const user = await User.findById(_id)
    console.log(user)

    if (!user.readArticles.includes(articleId)) {
        user.readArticles.push(articleId);
        user.save();
    } else {
        res.status(StatusCodes.OK).send({ message: 'Article already marked as read' });
    }

    res.status(StatusCodes.OK).json({ message: 'Article succefully marked as read' });
};

// Mark article as read
const toggleFavourite = async (req, res) => {
    const { _id } = req.user
    const articleId = req.params.id;

    const article = await Article.findById(articleId);
    if (!article) {
        throw new BadRequestError('Article not found')
    }
    const user = await User.findById(_id)
    console.log(user)

    if (!user.favouriteArticles.includes(articleId)) {
        user.favouriteArticles.push(articleId);
        user.save();
        res.status(StatusCodes.OK).json({ message: 'Article added to favourite ' });

    } else {
        user.favouriteArticles.filter((article) => new mongoose.Types.ObjectId(article) !== articleId);
        user.save();
        console.log('deleted')
        res.status(StatusCodes.OK).send({ message: 'Article deleted from favourite' });
    }

};

module.exports = {
    getAllArticles,
    markAsRead,
    toggleFavourite
}