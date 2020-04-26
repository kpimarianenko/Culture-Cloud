const mongoose = require('mongoose');

const UserSchema = {
    login: { type: String, required: true },
    fullname: { type: String, required: true },
    registeredAt: { type: Date, default: Date.now },
    avaUrl: { type: String },
    role: { type: Number, default: 0 },
    passwordHash: { type: String, required: true },
    isDisabled: { type: Boolean, default: false }
}

const UserModel = mongoose.model('User', UserSchema);

class User {
    constructor(login, passwordHash, fullname, avaUrl) {
        this.passwordHash = passwordHash;
        this.login = login;
        this.fullname = fullname;
        this.role = 0;
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
}

module.exports = User;