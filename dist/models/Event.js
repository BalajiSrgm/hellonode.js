"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema; // Create the User Schema.

var EventSchema = new Schema({
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
    "default": Date.now
  },
  end_date: {
    type: Date,
    "default": Date.now
  },
  createdBy: {
    type: String,
    required: false
  },
  lastUpdated: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
});

var Event = _mongoose["default"].model("Event", EventSchema);

var _default = Event;
exports["default"] = _default;