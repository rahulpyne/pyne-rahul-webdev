module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        facebook: {id: String, token: String},
        google: {id: String, token: String},
        email: String,
        imgUrl: String,
        phone: String,
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'MCMovie'}],
        movieLikes: [String],
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'MCUser'}],
        following: [{type: mongoose.Schema.Types.ObjectId, ref: 'MCUser'}],
        role: {type: String, enum: ['user', 'admin'], default: 'admin'},
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'mc.user'});
    return UserSchema;

};