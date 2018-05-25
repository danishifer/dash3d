'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _Login = require('./Login');

var _Login2 = _interopRequireDefault(_Login);

var _AppHeader = require('./AppHeader');

var _AppHeader2 = _interopRequireDefault(_AppHeader);

var _Assignments = require('./Assignments');

var _Assignments2 = _interopRequireDefault(_Assignments);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var _Sidebar = require('./Sidebar');

var _Sidebar2 = _interopRequireDefault(_Sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './Sidebar.css';
// import './App.css';


var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			sidebarOpen: true,
			tab: 'assignments'
		}, _this.changeTab = function (e, data) {
			_this.setState({
				tab: data.name
			});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(App, [{
		key: 'toggleSidebar',
		value: function toggleSidebar() {
			this.setState({
				sidebarOpen: !this.state.sidebarOpen
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'app' },
				_react2.default.createElement(_AppHeader2.default, { onMenuClick: this.toggleSidebar.bind(this) }),
				_react2.default.createElement(
					_semanticUiReact.Sidebar.Pushable,
					{ className: 'sidebar' },
					_react2.default.createElement(_Sidebar2.default, { visible: this.state.sidebarOpen, tab: this.state.tab, onChange: this.changeTab.bind(this) }),
					_react2.default.createElement(
						_semanticUiReact.Sidebar.Pusher,
						null,
						_react2.default.createElement(
							_semanticUiReact.Segment,
							{ basic: true, style: { paddingTop: "32px", width: this.state.sidebarOpen ? "80%" : "100%" } },
							_react2.default.createElement(
								'div',
								{ className: 'contentContainer' },
								_react2.default.createElement(_Tab2.default.Assignments, { active: this.state.tab === 'assignments' }),
								_react2.default.createElement(_Tab2.default.PrinterManager.Queue, { active: this.state.tab === 'queue' }),
								_react2.default.createElement(_Tab2.default.Teacher.Assignments, { active: this.state.tab === 'teacher-assignments' })
							)
						)
					)
				)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;