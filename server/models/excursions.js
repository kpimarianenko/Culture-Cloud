const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const ExcursionSchema = {
    name: { type: String, required: true },
    avaUrl: { type: String },
    price: { type: Number },
    about: { type: String },
    place: { type: ObjectId, ref: 'User'},
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

    static getGallery(collabId, page, quantity) {
        return ExcursionModel.find({place: collabId, avaUrl: { $exists: true }}, {avaUrl: 1, _id: 0}).skip((page - 1) * quantity).limit(quantity);
    }

    static getGalleryCount(collabId) {
        return ExcursionModel.find({place: collabId}).distinct('avaUrl').then(array => array.length);
    }

    static getCount(search, from, to) {
        const options = {
            name: { $regex: `(?i).*${search}.*(?-i)` },
        }
        formPriceOptions(from, to, options)
        return ExcursionModel.find(options).countDocuments();
    }

    static getPage(page, quantity, search, from, to) {
        const options = {
            name: { $regex: `(?i).*${search}.*(?-i)` },
        }
        formPriceOptions(from, to, options)
        return ExcursionModel.find(options).skip((page - 1) * quantity).limit(quantity).populate('place');
    }
}

function formPriceOptions(from, to, options) {
    const priceOptions = {}
    if (parseFloat(from))
        priceOptions.$gte = from;
    if (parseFloat(to))
        priceOptions.$lte = to;
    if (priceOptions.$gte || priceOptions.$lte)
        options.price = priceOptions;
}