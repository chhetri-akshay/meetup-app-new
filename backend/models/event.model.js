const mongoose = require("mongoose")

const speakerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
})

const EventsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    eventType: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
        required: true
    },
    ageRestriction: {
        type: Boolean,
        default: true
    },
    tags: [{
        type: String,
    }],
    startTime: { 
        type: Date,
        required: true
    },
    endTime: { 
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    speakers: [speakerSchema]
}, {timestamps: true})

const Events = mongoose.model("Events", EventsSchema)
module.exports = {Events}