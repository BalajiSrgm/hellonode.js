"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = _interopRequireDefault(require("path"));

var _mergeGraphqlSchemas = require("merge-graphql-schemas");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var typesArray = (0, _mergeGraphqlSchemas.fileLoader)(_path["default"].join(__dirname, './types'));

var _default = (0, _mergeGraphqlSchemas.mergeTypes)(typesArray, {
  schemaDefinition: false,
  all: true
});

exports["default"] = _default;