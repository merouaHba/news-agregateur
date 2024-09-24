const axios = require('axios');
const Article = require('../models/articleModel');
const xml2js = require('xml2js');



//  fetch and store news articles from Google News RSS feed
async function fetchNews(io) {
    try {
        const { data } = await axios.get('https://news.google.com/rss');
        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(data);
        const articles = result.rss.channel[0].item;

        articles.forEach(async article => {
            const existingArticlelink = await Article.findOne({ link: article.link[0] });
            const existingArticletitle = await Article.findOne({ title: article.title[0] });
            console.log(article)
            if (!existingArticlelink && !existingArticletitle) {
                const newArticle = new Article({
                    title: article.title[0],
                    link: article.link[0],
                    description: article.description[0],
                    pubDate: new Date(article.pubDate[0]),
                    category: article.category ? article.category[0] : 'General',
                });
                await newArticle.save();
                console.log('object', newArticle.link)
                io.emit('newArticle', newArticle);
                
            }
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

module.exports = fetchNews


