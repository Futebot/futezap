var recognize = require('tesseract.js').recognize;
// const PSM = require('tesseract.js/src/constants/PSM')
// const OEM = require('tesseract.js/src/constants/OEM')
exports.getText = function (imageData, lang) {
    if (lang === void 0) { lang = 'eng+ind'; }
    return new Promise(function (resolve, reject) {
        recognize(imageData, lang)
            .then(function (result) {
            var text = result.data.text;
            resolve(text.trim());
        })
            .catch(function (err) {
            reject(err);
        });
    });
};
// ;
// (async () => {
//     await getText('eng+ind', 'https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/118362225_771346593620114_5146656142177683609_n.jpg?_nc_cat=104&_nc_sid=0debeb&_nc_eui2=AeHnSu4XSeDvjM2_FLRt-tvEjUQMtkqviE6NRAy2Sq-ITrbAO3MaBX7-hQ8KJFhzyPsU_FOIFJfG6jCb2L3GDPkb&_nc_ohc=1XbUmmM6prYAX-2XKyM&_nc_ht=scontent-sin6-1.xx&oh=c26c94841df3ca0560a184ffb03fcbd6&oe=5F67E68E')
// })()
