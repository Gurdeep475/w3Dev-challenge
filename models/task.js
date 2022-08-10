const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// sets the task expiration date till the end of the current day
function _setExpireAt() {
    const currentTime = Date.now();
    const day = currentTime.getDay();
    const month = currentTime.getMonth();
    const year = currentTime.getFullYear();
    const timeAtEndOfDay = new Date(year, month, day, 23, 59, 59);
    return timeAtEndOfDay - currentTime;
}

const tasks = new Schema({
    title: { required: true, type: String },
    isDone: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    priority: { type: Number, default: 0, min: 0, max: 1 },
    expireAt: { type: Date, default: _setExpireAt }
}, { timeStamps: true }, { collections: "tasks" });

tasks.index({ expireAt: 1 }, { expireAfterSeconds: 0 })