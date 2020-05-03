import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the User Schema.
const EventSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  addressId: {
    type: String,
    required: true
  },
  parentId: {
    type: String,
    required: false
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  end_date: {
      type: Date,
      default: Date.now
  },
  createdBy: {
    type: String,
    required: false
  },
  lastUpdated:{
    type: Date,
      default: Date.now
  }
}, {timestamps: true});

const Event = mongoose.model("Event", EventSchema);

export default Event;