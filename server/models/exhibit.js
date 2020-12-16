const mongoose = require('mongoose');

const ExhibitSchema = {
    name: { type: String, required: true },
    url: { type: String },
    isPicture: { type: Boolean },
    text: { type: String },
}

const ExcursionModel = mongoose.model('Exhibit', ExhibitSchema);

module.exports = class Excursion {
    constructor(name, url, isVideo, text) {
        this.name = name;
        this.url = url;
        this.isPicture = isPicture;
        this.text = text;
    }

    static add(excursion) {
        return new ExcursionModel(excursion).save();
    }

    static getAll() {
        return ExcursionModel.find();
    }
}
