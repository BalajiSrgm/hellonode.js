"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Event = _interopRequireDefault(require("../../models/Event"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  event: function event(root, args) {
    return new Promise(function (resolve, reject) {
      _Event["default"].findOne(root).exec(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  events: function events() {
    return new Promise(function (resolve, reject) {
      _Event["default"].find({}).populate().exec(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  addEvent: function addEvent(root, _ref) {
    var id = _ref.id,
        name = _ref.name,
        email = _ref.email;
    var newEvent = new _Event["default"](root);
    return new Promise(function (resolve, reject) {
      newEvent.save(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  editEvent: function editEvent(root, _ref2) {
    var id = _ref2.id,
        name = _ref2.name,
        email = _ref2.email;
    return new Promise(function (resolve, reject) {
      _Event["default"].findOneAndUpdate({
        id: id
      }, {
        $set: {
          name: name,
          email: email
        }
      }).exec(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  deleteEvent: function deleteEvent(root, args) {
    return new Promise(function (resolve, reject) {
      _Event["default"].findOneAndRemove(args).exec(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  newEvent: function newEvent(root, args) {
    return '';
  },
  Event: {
    id: function id(event) {
      return event._id;
    }
  }
};
exports["default"] = _default;