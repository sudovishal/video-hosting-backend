import mongoose, {Schema} from "mongoose"

const subscriptionSchema = new Schema({
subscriber: {
    type: Schema.Types.ObjectId, // one who is subscribing
    ref: "User",
    required: true
},
channel: { //  one who is being subscribed.
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
}
}, {timestamps: true})


export const Subscription = mongoose.Model("Subscription", subscriptionSchema)

