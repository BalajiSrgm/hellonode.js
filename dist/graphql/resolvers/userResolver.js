"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  user: function user(root, args) {
    return new Promise(function (resolve, reject) {
      _User["default"].findOne(root).exec(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  users: function users() {
    return new Promise(function (resolve, reject) {
      _User["default"].find({}).populate().exec(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  addUser: function addUser(root, _ref) {
    var id = _ref.id,
        name = _ref.name,
        email = _ref.email;
    var newUser = new _User["default"](root);
    return new Promise(function (resolve, reject) {
      newUser.save(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  editUser: function editUser(root, _ref2) {
    var id = _ref2.id,
        name = _ref2.name,
        email = _ref2.email;
    console.log('<><>Args', root);
    return new Promise(function (resolve, reject) {
      _User["default"].findOneAndUpdate({
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
  deleteUser: function deleteUser(root, args) {
    return new Promise(function (resolve, reject) {
      _User["default"].findOneAndRemove(args).exec(function (err, res) {
        err ? reject(err) : resolve(res);
      });
    });
  },
  newUser: function newUser(root, args) {
    return '';
  },
  User: {
    id: function id(user) {
      return user.id;
    },
    name: function name(user) {
      return user.name;
    },
    email: function email(user) {
      return user.email;
    }
  }
};
exports["default"] = _default;