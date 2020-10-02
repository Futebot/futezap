const { recognize } = require('tesseract.js')

exports.getText = (imageData, lang = 'eng+ind') => new Promise((resolve, reject) => {
    recognize(imageData, lang)
        .then((result) => {
            const { data: { text } } = result
            resolve(text.trim())
        })
        .catch((err) => {
            reject(err)
        })
})
