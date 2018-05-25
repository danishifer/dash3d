'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactInputMask = require('react-input-mask');

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
// import './Assignment.css';


var Teacher = function Teacher() {
    _classCallCheck(this, Teacher);
};

;

Teacher.Assignments = function (_Component) {
    _inherits(TeacherAssignments, _Component);

    function TeacherAssignments() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TeacherAssignments);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TeacherAssignments.__proto__ || Object.getPrototypeOf(TeacherAssignments)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            assignments: [],
            title: "",
            meta: "",
            description: "",
            extra: "",
            addAssignmentCard: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TeacherAssignments, [{
        key: 'addAssignmentView',
        value: function addAssignmentView() {
            var _this2 = this;

            this.setState({
                addAssignmentCard: true,
                title: "Add Assignment",
                description: _react2.default.createElement(
                    _semanticUiReact.Form,
                    { style: { marginTop: "16px" } },
                    _react2.default.createElement(
                        _semanticUiReact.Form.Field,
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'Assignment Title'
                        ),
                        _react2.default.createElement('input', { type: 'text', placeHolder: 'Enter Assignment Title...' })
                    ),
                    _react2.default.createElement(_semanticUiReact.Form.TextArea, { label: 'Assignment Description', placeHolder: 'Enter Assignment Description...' }),
                    _react2.default.createElement(
                        _semanticUiReact.Form.Field,
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'Due Date'
                        ),
                        _react2.default.createElement(_reactInputMask2.default, { mask: '99-99-9999', maskChar: '_', placeHolder: 'DD-MM-YYYY' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Form.Group,
                        { inline: true },
                        _react2.default.createElement(
                            'label',
                            null,
                            'Type'
                        ),
                        _react2.default.createElement(_semanticUiReact.Form.Radio, { label: 'Personal', value: 'p' }),
                        _react2.default.createElement(_semanticUiReact.Form.Radio, { label: 'Team', value: 't' })
                    )
                ),
                extra: _react2.default.createElement(
                    'div',
                    { className: 'ui two buttons' },
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { basic: true, color: 'blue', onClick: function onClick() {
                                return _this2.setState({ addAssignmentCard: false });
                            } },
                        'Cancel'
                    ),
                    _react2.default.createElement(_semanticUiReact.Button, { primary: true, content: 'Add' })
                )
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            fetch(Teacher.Assignments.url).then(function (res) {
                return res.json();
            }).catch(function (e) {
                return alert(e);
            }).then(function (data) {
                fetch(Teacher.Assignments.assignmentsUrl).then(function (res) {
                    return res.json();
                }).catch(function (e) {
                    return alert(e);
                }).then(function (submittedAssignments) {
                    var assignments = [];

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = Object.entries(data).sort(function (a, b) {
                            return Date.parse(a[1].due) > Date.parse(b[1].due);
                        })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _ref2 = _step.value;

                            var _ref3 = _slicedToArray(_ref2, 2);

                            var id = _ref3[0];
                            var value = _ref3[1];

                            assignments.push(_react2.default.createElement(Teacher.Assignment, {
                                key: id,
                                title: value.title,
                                due: value.due,
                                description: value.description,
                                team: value.team,
                                membersSubmitted: value.membersSubmitted,
                                fillament: value.fillament,
                                printTime: value.printTime,
                                submittedAssignments: submittedAssignments
                            }));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    _this3.setState({
                        assignments: assignments
                    });
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Card.Group,
                null,
                this.state.addAssignmentCard ? _react2.default.createElement(_semanticUiReact.Card, {
                    header: this.state.title,
                    meta: this.state.meta,
                    description: this.state.description,
                    extra: this.state.extra
                }) : _react2.default.createElement(
                    _semanticUiReact.Card,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Card.Description,
                        { style: { height: "100%" } },
                        _react2.default.createElement(_semanticUiReact.Button, { basic: true, fluid: true, color: 'blue', style: { height: "100%" }, content: 'Add Assignment', icon: 'add', onClick: this.addAssignmentView.bind(this) })
                    )
                ),
                this.state.assignments
            );
        }
    }]);

    return TeacherAssignments;
}(_react.Component);

Teacher.Assignment = function (_Component2) {
    _inherits(TeacherAssignment, _Component2);

    function TeacherAssignment() {
        var _ref4;

        var _temp2, _this4, _ret2;

        _classCallCheck(this, TeacherAssignment);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, (_ref4 = TeacherAssignment.__proto__ || Object.getPrototypeOf(TeacherAssignment)).call.apply(_ref4, [this].concat(args))), _this4), _this4.state = {
            title: "",
            meta: "",
            description: "",
            extra: ""
        }, _this4.statuses = {
            0: { icon: "clock", name: "Pending" },
            1: { icon: "print", name: "Printing" },
            2: { icon: "checkmark", name: "Done" }
        }, _this4.setInfoView = function () {
            _this4.setState({
                title: _this4.props.title,
                meta: _react2.default.createElement(
                    _semanticUiReact.Card.Meta,
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_semanticUiReact.Icon, { name: _this4.props.team ? "users" : "user" }),
                        ' ',
                        _this4.props.team ? "Team" : "Personal"
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\xA0\u2022\xA0'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'clock' }),
                        ' ',
                        _this4.props.due
                    )
                ),
                description: _this4.props.description,
                extra: _react2.default.createElement(_semanticUiReact.Button, { fluid: true, basic: true, color: 'blue', icon: 'chevron down', content: 'Info', onClick: _this4.setStatisticsView.bind(_this4) })
            });
        }, _this4.setSubmittedView = function () {
            _this4.setState({
                description: _react2.default.createElement(
                    'div',
                    { style: { marginTop: "16px" } },
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Submitted By'
                    ),
                    _react2.default.createElement(
                        'ul',
                        null,
                        _this4.props.membersSubmitted.map(function (submission) {
                            return _react2.default.createElement(
                                'li',
                                { key: submission.assignmentId, className: 'teamParticipant' },
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    submission.members.map(function (obj, index) {
                                        return _react2.default.createElement(
                                            'span',
                                            { className: 'teamParticipant' },
                                            obj,
                                            submission.members.length > index + 1 && ", "
                                        );
                                    })
                                )
                            );
                        })
                    )
                ),
                extra: _react2.default.createElement(_semanticUiReact.Button, { fluid: true, basic: true, color: 'blue', icon: 'chevron left', content: 'Back', onClick: _this4.setStatisticsView.bind(_this4) })
            });
        }, _this4.setAssignmentView = function (assignmentId, onBack) {
            var assignment = _this4.props.submittedAssignments[assignmentId];
            _this4.setState({
                title: assignment.title,
                meta: _react2.default.createElement(
                    _semanticUiReact.Card.Meta,
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_semanticUiReact.Icon, { name: _this4.statuses[assignment.status].icon }),
                        ' ',
                        _this4.statuses[assignment.status].name
                    )
                ),
                description: _react2.default.createElement(
                    'div',
                    { style: { marginTop: "16px" } },
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Submitted By'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        assignment.members.map(function (obj, index) {
                            return _react2.default.createElement(
                                'span',
                                { className: 'teamParticipant' },
                                obj,
                                assignment.members.length > index + 1 && ", "
                            );
                        })
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Submitted On'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        assignment.submissionDate
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Model Description'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        assignment.description
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Fillament Used ',
                        _react2.default.createElement(
                            'span',
                            { className: 'extra' },
                            '(Estimated)'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _this4.props.fillament,
                        'mg'
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Print Time ',
                        _react2.default.createElement(
                            'span',
                            { className: 'extra' },
                            '(Estimated)'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _this4.props.printTime,
                        ' Hours'
                    )
                ),
                extra: _react2.default.createElement(
                    'div',
                    { className: 'ui two buttons' },
                    _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'blue', icon: 'chevron left', content: 'Back', onClick: onBack }),
                    _react2.default.createElement(_semanticUiReact.Button, { primary: true, icon: 'download', content: 'STL', onClick: function onClick() {
                            return alert("Download");
                        } })
                )
            });
        }, _this4.setStatisticsView = function () {
            _this4.setState({
                title: _this4.props.title,
                meta: _react2.default.createElement(
                    _semanticUiReact.Card.Meta,
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_semanticUiReact.Icon, { name: _this4.props.team ? "users" : "user" }),
                        ' ',
                        _this4.props.team ? "Team" : "Personal"
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        '\xA0\u2022\xA0'
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_semanticUiReact.Icon, { name: 'clock' }),
                        ' ',
                        _this4.props.due
                    )
                ),
                description: _react2.default.createElement(
                    'div',
                    { style: { marginTop: "16px" } },
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Assignment Description'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _this4.props.description
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Submitted By'
                    ),
                    function () {
                        var membersArray = _this4.props.membersSubmitted;
                        var membersArrayCollapsed = membersArray.slice(0, 3);

                        return _react2.default.createElement(
                            'ul',
                            null,
                            membersArrayCollapsed.map(function (submission) {
                                return _react2.default.createElement(
                                    'li',
                                    { key: submission.assignmentId, className: 'teamParticipant' },
                                    _react2.default.createElement(
                                        'a',
                                        { onClick: _this4.setAssignmentView.bind(_this4, submission.assignmentId, _this4.setStatisticsView.bind(_this4)) },
                                        submission.members.map(function (obj, index) {
                                            return _react2.default.createElement(
                                                'span',
                                                { className: 'teamParticipant' },
                                                obj,
                                                submission.members.length > index + 1 && ", "
                                            );
                                        })
                                    )
                                );
                            }),
                            membersArray.length > 3 && _react2.default.createElement(
                                'li',
                                null,
                                _react2.default.createElement(
                                    'a',
                                    { onClick: _this4.setSubmittedView.bind(_this4) },
                                    _react2.default.createElement(
                                        'strong',
                                        null,
                                        'View All...'
                                    )
                                )
                            )
                        );
                    }(),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Fillament Used ',
                        _react2.default.createElement(
                            'span',
                            { className: 'extra' },
                            '(Estimated)'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _this4.props.fillament,
                        'mg'
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Print Time ',
                        _react2.default.createElement(
                            'span',
                            { className: 'extra' },
                            '(Estimated)'
                        )
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _this4.props.printTime,
                        ' Hours'
                    )
                ),
                extra: _react2.default.createElement(_semanticUiReact.Button, { fluid: true, basic: true, color: 'blue', icon: 'chevron up', content: 'Info', onClick: _this4.setInfoView.bind(_this4) })
            });
        }, _temp2), _possibleConstructorReturn(_this4, _ret2);
    }

    _createClass(TeacherAssignment, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setInfoView();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_semanticUiReact.Card, {
                header: this.state.title,
                meta: this.state.meta,
                description: this.state.description,
                extra: this.state.extra
            });
        }
    }]);

    return TeacherAssignment;
}(_react.Component);

Teacher.Assignments.url = 'http://www.mocky.io/v2/5affdee7310000730076de9c';
Teacher.Assignments.assignmentsUrl = 'http://www.mocky.io/v2/5affe6b5310000550076dead';

exports.default = Teacher;