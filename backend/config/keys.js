dbPassword = 'mongodb+srv://Vishaal:'+ encodeURIComponent('vishaal12') + '@cluster11-du6mi.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword,
    secretORKey: 'SuperSpecialSafeSecret'
}