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
    constructor(email, passwordHash, name, about, avaUrl) {
        this.passwordHash = passwordHash;
        this.email = email;
        this.name = name;
        this.registeredAt = new Date();
        this.avaUrl = avaUrl;
        this.isDisabled = false;
        this.about = about;
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
}

class Collaborator extends User {
    constructor(email, passwordHash, name, placeName, city, cardNumber, cvv, expDate, type, about, avaUrl) {
        super(email, passwordHash, name, about, avaUrl);
        this.expDate = expDate
        this.role = 1;
        this.placeName = placeName;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.type = type;
        this.city = city;
    }

    static get(id) {
        return UserModel.findOne({_id: id, role: 1});
    }

    static getAll() {
        return UserModel.find({role: 1});
    }

    static getCount(search, types, cities) {
        return UserModel.find({role: 1, placeName: { $regex: `(?i).*${search}.*(?-i)` }, type: {$in: types}, city: {$in: cities}}).countDocuments();
    }

    static getPage(page, quantity, search, types, cities) {
        return UserModel.find({role: 1, placeName: { $regex: `(?i).*${search}.*(?-i)` }, type: {$in: types}, city: {$in: cities}}).skip((page - 1) * quantity).limit(quantity);
    }

    static delete(id) {
        return UserModel.deleteOne({ _id: id, role: 1});
    }

    static add(collaborator) {
        return new UserModel(collaborator).save();
    }

    static update(user) {
        return UserModel.findOneAndUpdate({_id: user.id, role: 1}, user);
    }

    static getTypes() {
        return UserModel.find({role: 1}).distinct('type');
    }

    static getCities() {
        return UserModel.find({role: 1}).distinct('city');
    }
}

module.exports = User;
module.exports.Collaborator = Collaborator;