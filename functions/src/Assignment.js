'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _app = require('firebase/app');

var _app2 = _interopRequireDefault(_app);

require('firebase/storage');

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _download = require('./download');

var _download2 = _interopRequireDefault(_download);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './Assignment.css'

var Assignment = function (_Component) {
    _inherits(Assignment, _Component);

    function Assignment() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Assignment);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Assignment.__proto__ || Object.getPrototypeOf(Assignment)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            title: "",
            meta: "",
            description: "",
            extra: "",
            uploaded: false,
            users: [],
            file: null,
            teamMembers: [],
            modelDescription: "",
            loading: false
        }, _this.setMoreInfoView = function () {
            console.log(_this.props);
            _this.setState({
                description: _react2.default.createElement(
                    'div',
                    { style: { marginTop: "16px" } },
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Assignement Description'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _this.props.description
                    ),
                    _react2.default.createElement(
                        'h5',
                        { className: 'infoLabel' },
                        'Model Description'
                    ),
                    _react2.default.createElement(
                        'p',
                        null,
                        _this.props.modelDescription
                    ),
                    _this.props.team && _this.props.teamParticipants && _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement(
                            'h5',
                            { className: 'infoLabel' },
                            'Team Participants'
                        ),
                        _react2.default.createElement(
                            'p',
                            null,
                            Object.entries(_this.props.teamParticipants).map(function (member, index) {
                                return _react2.default.createElement(
                                    'span',
                                    { className: 'teamParticipant' },
                                    member[1],
                                    Object.entries(_this.props.teamParticipants).length > index + 1 && ", "
                                );
                            })
                        )
                    ),
                    _this.props.fillament && _react2.default.createElement(
                        'div',
                        null,
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
                            _this.props.fillament,
                            'mg'
                        )
                    ),
                    _this.props.printTime && _react2.default.createElement(
                        'div',
                        null,
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
                            _this.props.printTime,
                            ' Hours'
                        )
                    )
                ),
                extra: _react2.default.createElement(
                    'div',
                    { className: 'ui two buttons' },
                    _react2.default.createElement(_semanticUiReact.Button, { primary: true, icon: 'download', content: 'STL', onClick: function onClick() {
                            return window.location = Assignment.urls.model.replace("{}", _this.props.id);
                        } }),
                    _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'blue', icon: 'chevron up', content: 'Info', onClick: _this.setInfoView.bind(_this) })
                )
            });
        }, _this.setInfoView = function () {
            console.log(_this.props.status === 1 ? "Printing" : "Pending");
            _this.setState({
                title: _this.props.title,
                meta: _react2.default.createElement(
                    _semanticUiReact.Card.Meta,
                    null,
                    _react2.default.createElement(
                        'span',
                        null,
                        _this.props.status && _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_semanticUiReact.Icon, { name: _this.props.status === 1 ? "print" : "clock" }),
                            ' ',
                            _this.props.status === 1 ? "Printing" : "Pending",
                            '\xA0\u2022\xA0'
                        )
                    ),
                    _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(_semanticUiReact.Icon, { name: _this.props.team ? "users" : "user" }),
                        ' ',
                        _this.props.team ? "Team" : "Personal"
                    ),
                    !_this.props.status && _react2.default.createElement(
                        'span',
                        null,
                        _react2.default.createElement(
                            'span',
                            null,
                            '\xA0\u2022\xA0'
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            _react2.default.createElement(_semanticUiReact.Icon, { name: 'calendar' }),
                            ' ',
                            _this.props.due
                        )
                    )
                ),
                description: _this.props.description,
                extra: _this.props.type === 'submitted' ? _react2.default.createElement(
                    'div',
                    { className: 'ui two buttons' },
                    _react2.default.createElement(_semanticUiReact.Button, { primary: true, icon: 'download', content: 'STL', onClick: function onClick() {
                            _app2.default.storage().ref('models/' + _this.props.modelId + '.' + _this.props.fileExtension).getDownloadURL().then(function (url) {
                                console.log(url);
                                (0, _download2.default)(url);
                            });
                        } }),
                    _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'blue', icon: 'chevron down', content: 'Info', onClick: _this.setMoreInfoView.bind(_this) })
                ) : _react2.default.createElement(_semanticUiReact.Button, { primary: true, fluid: true, content: 'Submit', onClick: _this.setSubmitView.bind(_this) })
            });
        }, _this.changeFile = function (e) {
            _this.setState({
                file: e.target.files[0]
            }, function () {
                _this.setSubmitView();
            });
        }, _this.setSubmitView = function () {
            var modelUpload = void 0;

            _this.setState({
                description: _react2.default.createElement(
                    'div',
                    { style: { marginTop: "16px" } },
                    _react2.default.createElement(
                        _semanticUiReact.Form,
                        null,
                        _react2.default.createElement('input', { type: 'file', id: 'model', name: 'model', ref: function ref(inst) {
                                return modelUpload = inst;
                            }, style: { display: "none" }, onChange: _this.changeFile.bind(_this) }),
                        _react2.default.createElement(
                            _semanticUiReact.Form.Field,
                            null,
                            _react2.default.createElement(
                                'label',
                                null,
                                'STL Model'
                            ),
                            _react2.default.createElement(
                                _semanticUiReact.Button,
                                { fluid: true, as: 'div', labelPosition: 'left', onClick: function onClick() {
                                        return modelUpload.click();
                                    } },
                                _react2.default.createElement(_semanticUiReact.Label, {
                                    as: 'a',
                                    basic: true,
                                    style: { flex: 1, color: _this.state.file ? "black" : "#c8c8c8" },
                                    content: _this.state.file ? _this.state.file.name : "Upload..."
                                }),
                                _react2.default.createElement(_semanticUiReact.Button, { icon: 'upload' })
                            )
                        ),
                        _this.props.team && _react2.default.createElement(_semanticUiReact.Form.Dropdown, { value: _this.state.teamMembers, label: 'Team Participants', placeholder: 'Add Participants', noResultsMessage: 'No participants available.', fluid: true, multiple: true, search: true, selection: true, options: _this.state.users, onChange: function onChange(e, _ref2) {
                                var value = _ref2.value;
                                _this.setState({ teamMembers: value }, function () {
                                    return _this.setSubmitView();
                                });
                            } }),
                        _react2.default.createElement(_semanticUiReact.Form.TextArea, { label: 'Model Description', placeholder: 'Enter Model Description', value: _this.state.modelDescription, onChange: function onChange(e, _ref3) {
                                var value = _ref3.value;
                                return _this.setState({ modelDescription: value }, function () {
                                    return _this.setSubmitView();
                                });
                            } })
                    )
                ),
                extra: _react2.default.createElement(
                    'div',
                    { className: 'ui two buttons' },
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { basic: true, color: 'blue', onClick: _this.setInfoView.bind(_this) },
                        'Cancel'
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Button,
                        { primary: true, onClick: function onClick() {
                                _this.setState({ loading: true });
                                var modelId = (0, _v2.default)();
                                var filename = modelId + '.' + _this.state.file.name.split('.').pop();
                                var fileExtension = _this.state.file.name.split('.').pop();

                                _app2.default.storage().ref('models').child(filename).put(_this.state.file).then(function (snap) {
                                    var reqBody = {
                                        description: _this.state.modelDescription,
                                        isTeam: _this.props.team,
                                        fileExtension: fileExtension
                                    };

                                    if (_this.props.team) reqBody.team = _this.state.teamMembers;

                                    fetch('assignment/' + _this.props.id + '/submit?modelId=' + modelId, {
                                        method: 'PUT',
                                        credentials: 'include',
                                        body: JSON.stringify(reqBody),
                                        headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                        }
                                    }).then(function (res) {
                                        return res.json();
                                    }).catch(function (e) {
                                        return alert(e);
                                    }).then(function (data) {
                                        window.location.reload();
                                    });
                                });
                            } },
                        'Submit'
                    )
                )
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Assignment, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            fetch('assignment/' + this.props.id + '/users', {
                method: 'GET',
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/json'
                })
            }).then(function (res) {
                return res.json();
            }).catch(function (error) {
                return alert('Error: ' + error);
            }).then(function (data) {
                _this2.setState({
                    users: data
                });
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setInfoView();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Card,
                null,
                _react2.default.createElement(
                    _semanticUiReact.Dimmer,
                    { active: this.state.loading },
                    _react2.default.createElement(
                        _semanticUiReact.Loader,
                        null,
                        'Loading...'
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Card.Content,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Card.Header,
                        null,
                        this.state.title
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Card.Meta,
                        null,
                        this.state.meta
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Card.Description,
                        null,
                        this.state.description
                    )
                ),
                _react2.default.createElement(
                    _semanticUiReact.Card.Content,
                    { extra: true },
                    this.state.extra
                )
            );
        }
    }]);

    return Assignment;
}(_react.Component);

exports.default = Assignment;