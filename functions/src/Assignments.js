'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _semanticUiReact = require('semantic-ui-react');

var _Assignment = require('./Assignment');

var _Assignment2 = _interopRequireDefault(_Assignment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Assignments = function (_Component) {
    _inherits(Assignments, _Component);

    function Assignments() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Assignments);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Assignments.__proto__ || Object.getPrototypeOf(Assignments)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            assignments: [],
            loading: true
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Assignments, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch(Assignments.urls[this.props.type], {
                credentials: 'include'
            }).then(function (res) {
                return res.json();
            }).catch(function (error) {
                return console.error('Error:', error);
            }).then(function (data) {
                var assignments = [];

                if (_this2.props.type === 'submitted') {
                    if (Object.entries(data).length === 0) {
                        _this2.setState({
                            loading: false,
                            assignments: _react2.default.createElement(
                                'p',
                                { style: { marginLeft: "8px", color: "gray" } },
                                'No ',
                                _this2.props.type === 'pending' ? "Pending" : "Submitted",
                                ' Assignments'
                            )
                        });
                        return;
                    }

                    Object.entries(data).forEach(function (assignment, index) {

                        var id = assignment[1][0];
                        var value = assignment[1][1];

                        fetch('/assignment/' + id + '/info', { credentials: 'include' }).then(function (res) {
                            return res.json();
                        }).catch(function (e) {
                            return console.error(e);
                        }).then(function (info) {
                            assignments.push(_react2.default.createElement(_Assignment2.default, {
                                key: id,
                                id: id,
                                title: value.title,
                                team: value.team,
                                due: value.due,
                                description: value.description,
                                type: _this2.props.type,
                                fillament: info.fillament,
                                printTime: info.printTime,
                                status: info.status,
                                teamParticipants: info.teamMembers,
                                modelId: info.modelId,
                                modelDescription: info.description,
                                fileExtension: info.fileExtension
                            }));

                            _this2.setState({
                                loading: false,
                                assignments: assignments
                            });
                        });
                    });
                } else {
                    var _assignments = data.map(function (assignment) {
                        var id = assignment[0];
                        var value = assignment[1];
                        return _react2.default.createElement(_Assignment2.default, {
                            key: id,
                            id: id,
                            title: value.title,
                            team: value.team,
                            due: value.due,
                            description: value.description,
                            type: _this2.props.type
                        });
                    });

                    _this2.setState({
                        loading: false,
                        assignments: _assignments.length > 0 ? _assignments : _react2.default.createElement(
                            'p',
                            { style: { marginLeft: "8px", color: "gray" } },
                            'No ',
                            _this2.props.type === 'pending' ? "Pending" : "Submitted",
                            ' Assignments'
                        )
                    });
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: { display: this.state.loading ? "block" : "none" } },
                    _react2.default.createElement(_semanticUiReact.Loader, { active: this.state.loading, inline: true }),
                    _react2.default.createElement(
                        'span',
                        { style: { "fontFamily": "Lato" } },
                        '\xA0\xA0\xA0Loading...'
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Card.Group,
                    null,
                    this.state.assignments
                )
            );
        }
    }]);

    return Assignments;
}(_react.Component);

Assignments.types = {
    pending: 'pending',
    submitted: 'submitted'
};

Assignments.urls = {
    pending: 'assignments/pending',
    submitted: 'assignments/submitted'
};

exports.default = Assignments;