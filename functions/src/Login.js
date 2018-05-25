'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _reactCookies = require('react-cookies');

var _reactCookies2 = _interopRequireDefault(_reactCookies);

var _app = require('firebase/app');

var _app2 = _interopRequireDefault(_app);

require('firebase/auth');

var _AppHeader = require('./AppHeader');

var _AppHeader2 = _interopRequireDefault(_AppHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './App.css';

var config = {
    apiKey: "AIzaSyAu7OJskU1ma8Wt0tDHQfi5C9lAXiEVtA8",
    authDomain: "threed-printing-dashboard.firebaseapp.com",
    databaseURL: "https://threed-printing-dashboard.firebaseio.com",
    projectId: "threed-printing-dashboard",
    storageBucket: "threed-printing-dashboard.appspot.com",
    messagingSenderId: "959893611225"
};

_app2.default.initializeApp(config);

var emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/;

var Login = function (_Component) {
    _inherits(Login, _Component);

    function Login() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Login);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Login.__proto__ || Object.getPrototypeOf(Login)).call.apply(_ref, [this].concat(args))), _this), _this.onLogin = function (email, password) {
            _app2.default.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                alert(error.message);
            }).then(function (user) {
                _app2.default.auth().currentUser.getIdToken().then(function (token) {
                    _reactCookies2.default.save('__session', token, { path: '/' });
                    window.location = 'dashboard';
                });
            });
        }, _this.onSignup = function () {
            var firstName = _this.state.firstName;
            var lastName = _this.state.lastName;
            var email = _this.state.email;
            var password = _this.state.password;

            _app2.default.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
                _app2.default.auth().currentUser.getIdToken().then(function (token) {
                    _reactCookies2.default.save('__session', token, { path: '/' });
                    fetch('/user', {
                        method: 'PUT',
                        credentials: 'include',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName
                        })
                    }).then(function (res) {
                        return res.json();
                    }).catch(function (e) {
                        return console.error(e);
                    }).then(function (data) {
                        console.log(data);
                        window.location = 'dashboard';
                    });
                });
            });
        }, _this.validateEmail = function (email) {
            return !emailPattern.test(email);
        }, _this.validatePassword = function (password) {
            return password.length < 6;
        }, _this.validateConfirmPassword = function (confirmPassword, password) {
            return confirmPassword !== password;
        }, _this.handleVisibility = function () {
            _this.setState({
                createAccount: !_this.state.createAccount
            });
        }, _this.handleEmail = function (event) {
            _this.setState({
                email: event.target.value,
                emailError: _this.validateEmail(event.target.value)
            });
        }, _this.handlePassword = function (event) {
            _this.setState({
                password: event.target.value,
                passwordError: _this.validatePassword(event.target.value)
            });
        }, _this.handleConfirmPassword = function (event) {
            return _this.setState({ confirmPasswordError: _this.validateConfirmPassword(event.target.value, _this.state.password) });
        }, _this.state = {
            email: "",
            password: "",
            emailError: false,
            createAccount: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Login, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                createAccount = _state.createAccount,
                emailError = _state.emailError,
                passwordError = _state.passwordError,
                confirmPasswordError = _state.confirmPasswordError,
                firstName = _state.firstName,
                lastName = _state.lastName;


            return _react2.default.createElement(
                'div',
                { className: 'app' },
                _react2.default.createElement(_AppHeader2.default, null),
                _react2.default.createElement(
                    'div',
                    { className: 'contentContainer center' },
                    _react2.default.createElement(
                        'div',
                        { id: 'login' },
                        _react2.default.createElement(
                            _semanticUiReact.Segment.Group,
                            { horizontal: true, id: 'segment' },
                            _react2.default.createElement(
                                _semanticUiReact.Segment,
                                { id: 'form' },
                                _react2.default.createElement(
                                    _semanticUiReact.Form,
                                    { id: 'loginForm' },
                                    _react2.default.createElement(
                                        _semanticUiReact.Transition.Group,
                                        { animation: 'slide up', duration: '500' },
                                        createAccount && _react2.default.createElement(
                                            'div',
                                            { className: 'extra-inputs' },
                                            _react2.default.createElement(
                                                _semanticUiReact.Form.Group,
                                                null,
                                                _react2.default.createElement(_semanticUiReact.Form.Input, { value: firstName, onChange: function onChange(e) {
                                                        return _this2.setState({ firstName: e.target.value });
                                                    }, fluid: true, autoComplete: 'given-name', label: 'First name', placeholder: 'First Name' }),
                                                _react2.default.createElement(_semanticUiReact.Form.Input, { value: lastName, onChange: function onChange(e) {
                                                        return _this2.setState({ lastName: e.target.value });
                                                    }, fluid: true, autoComplete: 'family-name', label: 'Last name', placeholder: 'Last name' })
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { fluid: true, icon: 'mail', autoComplete: 'email', label: 'Email', placeholder: 'Email', error: createAccount && emailError, onChange: this.handleEmail }),
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { fluid: true, icon: 'lock', label: 'Password', placeholder: 'Password', type: 'password', error: createAccount && passwordError, onChange: this.handlePassword }),
                                    _react2.default.createElement(
                                        _semanticUiReact.Transition.Group,
                                        { animation: 'slide up', duration: '500' },
                                        createAccount && _react2.default.createElement(
                                            'div',
                                            { className: 'extra-inputs' },
                                            _react2.default.createElement(_semanticUiReact.Form.Input, { fluid: true, autoComplete: 'new-password', label: 'Confirm Password', type: 'password', placeholder: 'Confirm Password', error: createAccount && confirmPasswordError, onChange: this.handleConfirmPassword })
                                        )
                                    ),
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { fluid: true, label: '', control: _semanticUiReact.Button, primary: true, type: 'submit', onClick: createAccount ? this.onSignup.bind(this, firstName, lastName) : this.onLogin.bind(this, this.state.email, this.state.password), content: createAccount ? "Create your account" : "Login" }),
                                    _react2.default.createElement(_semanticUiReact.Divider, null),
                                    _react2.default.createElement(_semanticUiReact.Form.Input, { fluid: true, label: '', control: _semanticUiReact.Button, onClick: this.handleVisibility, content: createAccount ? "Login" : "Create your account" })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Login;
}(_react.Component);

exports.default = Login;