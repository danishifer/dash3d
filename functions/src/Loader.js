"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Loader(props) {
    return _react2.default.createElement(
        "div",
        { style: { display: props.loading ? "block" : "none" } },
        _react2.default.createElement(Loader, { active: props.loading, inline: true }),
        _react2.default.createElement(
            "span",
            { style: { "fontFamily": "Lato" } },
            "\xA0\xA0\xA0",
            props.children
        )
    );
}

exports.default = Loader;