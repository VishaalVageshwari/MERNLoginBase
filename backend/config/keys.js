dbPassword = 'mongodb+srv://<user>:'+ encodeURIComponent('<password>') + '@cluster11-du6mi.mongodb.net/test?retryWrites=true&w=majority';

module.exports = {
    mongoURI: dbPassword,
    secretORKey: 'SuperSpecialSafeSecret'
}
