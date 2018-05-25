'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './Assignment.css';

var Queue = function (_Component) {
    _inherits(Queue, _Component);

    function Queue() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Queue);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Queue.__proto__ || Object.getPrototypeOf(Queue)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            items: []
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Queue, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            fetch(Queue.urls[this.props.done ? "done" : "pending"]).then(function (res) {
                return res.json();
            }).catch(function (error) {
                return console.error('Error:', error);
            }).then(function (data) {
                var items = [];

                var dataArray = Object.entries(data).sort(function (a, b) {
                    if (a[1].status === 1) return -1;
                    if (b[1].status === 1) return 1;
                    return Date.parse(a[1].due) > Date.parse(b[1].due);
                });

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = dataArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _ref2 = _step.value;

                        var _ref3 = _slicedToArray(_ref2, 2);

                        var id = _ref3[0];
                        var value = _ref3[1];

                        items.push(_react2.default.createElement(Queue.Item, {
                            key: id,
                            title: value.title,
                            user: value.user,
                            description: value.description,
                            due: value.due,
                            status: value.status
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

                _this2.setState({
                    loading: false,
                    items: items
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _semanticUiReact.Card.Group,
                null,
                this.state.items
            );
        }
    }]);

    return Queue;
}(_react.Component);

Queue.Item = function (_Component2) {
    _inherits(QueueItem, _Component2);

    function QueueItem() {
        var _ref4;

        var _temp2, _this3, _ret2;

        _classCallCheck(this, QueueItem);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref4 = QueueItem.__proto__ || Object.getPrototypeOf(QueueItem)).call.apply(_ref4, [this].concat(args))), _this3), _this3.statuses = {
            0: { icon: "clock", name: "Pending", action: { icon: "print", name: "Print", onClick: function onClick() {
                        return _this3.setSubmitView();
                    } } },
            1: { icon: "print", name: "Printing", color: "green", action: { icon: "checkmark", name: "Done", onClick: function onClick() {
                        return _this3.setState({ doneConfirmOpen: true });
                    } } },
            2: { icon: "checkmark", name: "Done" }
        }, _this3.state = {
            title: "",
            meta: "",
            description: "",
            tags: "",
            actions: "",
            doneConfirmOpen: false
        }, _this3.setInfoView = function () {
            var statusData = _this3.statuses[_this3.props.status];

            _this3.setState({
                title: _this3.props.title,
                meta: _this3.props.user.name,
                description: _this3.props.description,
                tags: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(_semanticUiReact.Label, { color: statusData.color, icon: statusData.icon, content: statusData.name }),
                    _react2.default.createElement(_semanticUiReact.Label, { icon: 'calendar', content: _this3.props.due })
                ),
                actions: _react2.default.createElement(
                    'div',
                    { className: 'ui two buttons' },
                    _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'blue', icon: 'download', content: 'STL', onClick: function onClick() {
                            return window.location = 'https://google.com';
                        } }),
                    statusData.action && _react2.default.createElement(_semanticUiReact.Button, { primary: true, icon: statusData.action.icon, content: statusData.action.name, onClick: statusData.action.onClick })
                )
            });
        }, _this3.setSubmitView = function () {
            _this3.setState({
                description: _react2.default.createElement(Queue.Item.Submit, null),
                actions: _react2.default.createElement(Queue.Item.Submit.Actions, { onCancel: _this3.setInfoView }),
                tags: null
            });
        }, _temp2), _possibleConstructorReturn(_this3, _ret2);
    }

    _createClass(QueueItem, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setInfoView();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            return _react2.default.createElement(
                _semanticUiReact.Card,
                null,
                _react2.default.createElement(_semanticUiReact.Confirm, {
                    header: 'Set Assignment As Done',
                    content: 'Are you sure you want to set this assignment as Done?',
                    open: this.state.doneConfirmOpen,
                    onCancel: function onCancel() {
                        return _this4.setState({ doneConfirmOpen: false });
                    },
                    onConfirm: function onConfirm() {
                        return _this4.setState({ doneConfirmOpen: false });
                    }
                }),
                _react2.default.createElement(
                    _semanticUiReact.Card.Content,
                    null,
                    _react2.default.createElement(_semanticUiReact.Card.Header, { content: this.state.title }),
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
                this.state.tags && _react2.default.createElement(_semanticUiReact.Card.Content, { extra: true, content: this.state.tags }),
                _react2.default.createElement(
                    _semanticUiReact.Card.Content,
                    { extra: true },
                    this.state.actions
                )
            );
        }
    }]);

    return QueueItem;
}(_react.Component);

Queue.Item.Submit = function (_Component3) {
    _inherits(QueueItemSubmit, _Component3);

    function QueueItemSubmit() {
        _classCallCheck(this, QueueItemSubmit);

        return _possibleConstructorReturn(this, (QueueItemSubmit.__proto__ || Object.getPrototypeOf(QueueItemSubmit)).apply(this, arguments));
    }

    _createClass(QueueItemSubmit, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { style: { marginTop: "16px" } },
                _react2.default.createElement(
                    _semanticUiReact.Form,
                    null,
                    _react2.default.createElement(
                        _semanticUiReact.Form.Field,
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'STL Model'
                        ),
                        _react2.default.createElement(_semanticUiReact.Button, { fluid: true, icon: 'download', onClick: function onClick() {
                                return alert("Download STL");
                            }, content: 'Download STL Model' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Form.Field,
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'Estimated Fillament Usage ',
                            _react2.default.createElement(
                                'span',
                                { className: 'extra' },
                                '(mg)'
                            )
                        ),
                        _react2.default.createElement('input', { placeholder: '2' })
                    ),
                    _react2.default.createElement(
                        _semanticUiReact.Form.Field,
                        null,
                        _react2.default.createElement(
                            'label',
                            null,
                            'Estimated Print Time ',
                            _react2.default.createElement(
                                'span',
                                { className: 'extra' },
                                '(hours)'
                            )
                        ),
                        _react2.default.createElement('input', { placeholder: '4' })
                    )
                )
            );
        }
    }]);

    return QueueItemSubmit;
}(_react.Component);

Queue.Item.Submit.Actions = function (props) {
    return _react2.default.createElement(
        'div',
        { className: 'ui two buttons' },
        _react2.default.createElement(_semanticUiReact.Button, { basic: true, color: 'blue', content: 'Cancel', onClick: props.onCancel }),
        _react2.default.createElement(_semanticUiReact.Button, { primary: true, content: 'Set As Printing', onClick: props.onPrint })
    );
};

Queue.urls = {
    'pending': 'http://www.mocky.io/v2/5afd8d643200008d00f1ad1f',
    'done': 'http://www.mocky.io/v2/5afe84453200007f00222ec3'
};

exports.default = Queue;