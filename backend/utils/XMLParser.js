const xml2js = require('xml2js');

exports.parse = (xmlData) => {
    return new Promise((resolve, reject) => {
        xml2js.parseString(xmlData, { mergeAttrs: true, explicitArray: false }, (err, result) => {
            if (err) reject(err);
            resolve(result.rss.channel);
        });
    });
};
