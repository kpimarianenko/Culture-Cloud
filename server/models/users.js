const mongoose = require('mongoose');

const UserSchema = {
    email: { type: String, required: true },
    name: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    avaUrl: { type: String },
    role: { type: Number, default: 0 },
    passwordHash: { type: String },
    googleId: { type: String },
    isDisabled: { type: Boolean, default: false },
    cardNumber: { type: String },
    about: { type: String },
    type: { type: String },
    city: { type: String },
    expDate: { type: String },
    placeName: { type: String },
    cvv: { type: Number },
}

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(email, passwordHash, name, avaUrl) {
        this.passwordHash = passwordHash;
        this.email = email;
        this.name = name;
        this.registeredAt = new Date();
        this.avaUrl = avaUrl;
        this.isDisabled = false;
    }

    static add(user) {
        return new UserModel(user).save();
    }

    static update(user) {
        return UserModel.findOneAndUpdate({_id: user.id}, user);
    }

    static delete(id) {
        return UserModel.deleteOne({ _id: id });
    }

    static get(id) {
        return UserModel.findById(id);
    }

    static getByEmail(email) {
        return UserModel.findOne({email});
    }

    static getByGoogleId(googleId) {
        return UserModel.findOne({googleId});
    }

    static getByEmailAndPasswordHash(email, passwordHash) {
        return UserModel.findOne({email: email, passwordHash: passwordHash});
    }

    // Assuming you don't want duplicates, you can directly get an array of the unique regId values in the collection using distinct:
    // Device.distinct('regId', function(err, regIdsArray) {...});

}

class Collaborator extends User {
    constructor(email, passwordHash, name, placeName, city, cardNumber, cvv, expDate, type, about, avaUrl) {
        super(email, passwordHash, name, avaUrl);
        this.expDate = expDate
        this.role = 1;
        this.placeName = placeName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.type = type;
        this.city = city;
        this.about = about;
    }

    static get(id) {
        return UserModel.findOne({_id: id, role: 1});
    }

    static getAll() {
        return UserModel.find({role: 1});
    }

    static getPage(page, quantity) {
        return UserModel.find({role: 1}).skip((page - 1) * quantity).limit(quantity);;
    }

    static delete(id) {
        return UserModel.deleteOne({ _id: id, role: 1});
    }

    static add(collaborator) {
        return new UserModel(collaborator).save();
    }

    static update(user) {
        return UserModel.findOneAndUpdate({_id: user.id}, user);
    }
}

module.exports = User;
module.exports.Collaborator = Collaborator;