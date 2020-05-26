const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ExcursionSchema = {
    name: { type: String, required: true },
    avaUrl: { type: String },
    price: { type: Number },
    about: { type: String },
    place: { type: ObjectId, ref: 'Collaborator'},
}

const ExcursionModel = mongoose.model('Excursion', ExcursionSchema);

module.exports = class Excursion {
    constructor(name, about, price, placeId, avaUrl) {
        this.name = name;
        this.avaUrl = avaUrl;
        this.price = price;
        this.place = placeId;
        this.about = about;
    }

    static add(excursion) {
        return new ExcursionModel(excursion).save();
    }

    static update(excursion) {
        return ExcursionModel.findOneAndUpdate({_id: excursion.id}, excursion);
    }

    static delete(id) {
        return ExcursionModel.deleteOne({ _id: id });
    }

    static get(id) {
        return ExcursionModel.findById(id).populate('place');
    }

    static getCollaboratorsExcursions(collabId) {
        return ExcursionModel.find({place: collabId});
    }
}