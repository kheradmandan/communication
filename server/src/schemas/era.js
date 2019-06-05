const mongoose = require('mongoose');

const EraSchema = new mongoose.Schema({
    origin: {type: Number},
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 32,
    },
    init: {type: Number, default: 0},
    seq: {type: Number, default: 0},
    inc: {type: Number, default: 1},
});

EraSchema.index({origin: 1, title: 1}, {unique: true});

EraSchema.method.getNextSequence = async function getNextSequence() {
    // Race condition!!!
    let threshold = 100;
    while (--threshold) {
        const current = await EraSchema.findOne({_id: this._id});
        const {nModified} = await EraSchema.updateOne({
            _id: current._id,
            seq: current.seq
        }, {
            $inc: {seq: current.inc}
        });
        if (nModified) {
            const successIncrement = await EraSchema.findOne({_id: this._id});
            return successIncrement.seq;
        }
    }
    throw new Error('Cannot getNextSequence because threshold reached.')
};

module.exports = mongoose.model('Era', EraSchema);