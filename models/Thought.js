const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: [{ type: String, required: true, trim: true, minLength: 1, maxLength: 280 }],
        createdAt: [{
            type: Date,
            default: Date.now,
            validate: {
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
        }],
        username: [{ type: String, required: true }],
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual property `createdAt` that formats the timestamp on query
thoughtSchema.virtual('createdAt').get(function () {
    var date = this.createdAt;
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const createdDate = date.toLocaleString('en-US', options);
    return createdDate;
});

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
