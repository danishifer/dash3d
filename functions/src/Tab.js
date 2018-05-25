'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Assignments = require('./Assignments');

var _Assignments2 = _interopRequireDefault(_Assignments);

var _Queue = require('./Queue');

var _Queue2 = _interopRequireDefault(_Queue);

var _Teacher = require('./Teacher');

var _Teacher2 = _interopRequireDefault(_Teacher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tab = function Tab(props) {
    return _react2.default.createElement(
        'div',
        { style: { display: props.active ? "block" : "none" } },
        props.children
    );
};

Tab.Assignments = function (_Component) {
    _inherits(TabAssignment, _Component);

    function TabAssignment() {
        _classCallCheck(this, TabAssignment);

        return _possibleConstructorReturn(this, (TabAssignment.__proto__ || Object.getPrototypeOf(TabAssignment)).apply(this, arguments));
    }

    _createClass(TabAssignment, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                Tab,
                { active: this.props.active },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Assignments To Submit'
                ),
                _react2.default.createElement(_Assignments2.default, { type: _Assignments2.default.types.pending }),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                    'h1',
                    null,
                    'Submitted Assignments'
                ),
                _react2.default.createElement(_Assignments2.default, { type: _Assignments2.default.types.submitted })
            );
        }
    }]);

    return TabAssignment;
}(_react.Component);

Tab.PrinterManager = {};
Tab.PrinterManager.Queue = function (_Component2) {
    _inherits(TabQueue, _Component2);

    function TabQueue() {
        _classCallCheck(this, TabQueue);

        return _possibleConstructorReturn(this, (TabQueue.__proto__ || Object.getPrototypeOf(TabQueue)).apply(this, arguments));
    }

    _createClass(TabQueue, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                Tab,
                { active: this.props.active },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Pending / Printing'
                ),
                _react2.default.createElement(_Queue2.default, null),
                _react2.default.createElement(
                    'h1',
                    null,
                    'Done'
                ),
                _react2.default.createElement(_Queue2.default, { done: true })
            );
        }
    }]);

    return TabQueue;
}(_react.Component);

Tab.Teacher = {};
Tab.Teacher.Assignments = function (_Component3) {
    _inherits(TabTeacherAssignments, _Component3);

    function TabTeacherAssignments() {
        _classCallCheck(this, TabTeacherAssignments);

        return _possibleConstructorReturn(this, (TabTeacherAssignments.__proto__ || Object.getPrototypeOf(TabTeacherAssignments)).apply(this, arguments));
    }

    _createClass(TabTeacherAssignments, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                Tab,
                { active: this.props.active },
                _react2.default.createElement(
                    'h1',
                    null,
                    'Manage Assignments'
                ),
                _react2.default.createElement(_Teacher2.default.Assignments, null)
            );
        }
    }]);

    return TabTeacherAssignments;
}(_react.Component);

exports.default = Tab;