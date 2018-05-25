'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AppSidebar = function AppSidebar(props) {
    return _react2.default.createElement(
        _semanticUiReact.Sidebar,
        { as: _semanticUiReact.Menu, animation: 'push', visible: props.visible, vertical: true, inverted: true, size: 'large', className: 'sidebar' },
        _react2.default.createElement(
            _semanticUiReact.Menu.Item,
            null,
            _react2.default.createElement(
                _semanticUiReact.Menu.Header,
                null,
                'Student'
            ),
            _react2.default.createElement(
                _semanticUiReact.Menu.Menu,
                null,
                _react2.default.createElement(_semanticUiReact.Menu.Item, { active: props.tab === 'assignments', as: 'a', name: 'assignments', icon: 'clipboard', content: 'Assignments', onClick: props.onChange })
            )
        ),
        _react2.default.createElement(
            _semanticUiReact.Menu.Item,
            null,
            _react2.default.createElement(
                _semanticUiReact.Menu.Header,
                null,
                'Printer Manager'
            ),
            _react2.default.createElement(
                _semanticUiReact.Menu.Menu,
                null,
                _react2.default.createElement(_semanticUiReact.Menu.Item, { active: props.tab === 'queue', as: 'a', name: 'queue', icon: 'list', content: 'Queue', onClick: props.onChange })
            )
        ),
        _react2.default.createElement(
            _semanticUiReact.Menu.Item,
            null,
            _react2.default.createElement(
                _semanticUiReact.Menu.Header,
                null,
                'Teacher'
            ),
            _react2.default.createElement(
                _semanticUiReact.Menu.Menu,
                null,
                _react2.default.createElement(_semanticUiReact.Menu.Item, { active: props.tab === 'teacher-assignments', as: 'a', name: 'teacher-assignments', icon: 'clipboard', content: 'Assignments', onClick: props.onChange })
            )
        ),
        _react2.default.createElement(
            'span',
            { className: 'footnotes' },
            '\xA9 2018 Dani Shifer'
        )
    );
};

exports.default = AppSidebar;