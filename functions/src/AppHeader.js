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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './AppHeader.css';

var AppHeader = function (_Component) {
    _inherits(AppHeader, _Component);

    function AppHeader() {
        _classCallCheck(this, AppHeader);

        return _possibleConstructorReturn(this, (AppHeader.__proto__ || Object.getPrototypeOf(AppHeader)).apply(this, arguments));
    }

    _createClass(AppHeader, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'header-bar' },
                _react2.default.createElement(_semanticUiReact.Icon, { inverted: true, link: true, name: 'bars', className: 'offset', onClick: this.props.onMenuClick }),
                _react2.default.createElement(_semanticUiReact.Header, { inverted: true, as: 'h3', className: 'headerText', content: 'Print3D' }),
                _react2.default.createElement(
                    'div',
                    { className: 'actions' },
                    _react2.default.createElement(
                        'a',
                        null,
                        'Contact Us'
                    ),
                    _react2.default.createElement(
                        'a',
                        null,
                        'About'
                    ),
                    _react2.default.createElement(_semanticUiReact.Button, { inverted: true, icon: 'sign out', as: 'button', content: 'Logout', onClick: function onClick() {
                            console.log("Hello");
                            _app2.default.auth().signOut().then(function () {
                                _reactCookies2.default.remove('__session');
                                window.location = '/';
                            });
                        } })
                )
            );
        }
    }]);

    return AppHeader;
}(_react.Component);

exports.default = AppHeader;