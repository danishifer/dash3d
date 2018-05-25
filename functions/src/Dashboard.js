'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paragraph = _react2.default.createElement(_semanticUiReact.Image, { src: '/assets/images/wireframe/short-paragraph.png' });

var Dashboard = function Dashboard() {
  return _react2.default.createElement(
    _semanticUiReact.Card,
    { style: { width: "1024px", padding: "16px" } },
    _react2.default.createElement(
      _semanticUiReact.Item.Group,
      { divided: true },
      _react2.default.createElement(
        _semanticUiReact.Item,
        null,
        _react2.default.createElement(
          _semanticUiReact.Item.Content,
          null,
          _react2.default.createElement(
            _semanticUiReact.Item.Header,
            null,
            'Biomimicry Project Prototype'
          ),
          _react2.default.createElement(
            _semanticUiReact.Item.Meta,
            null,
            _react2.default.createElement(
              'span',
              { className: 'price' },
              '12th May 2018'
            )
          ),
          _react2.default.createElement(
            _semanticUiReact.Item.Description,
            null,
            'Create a 3D model in Tinkercad for your team\u2019s biomimcry project prototype'
          ),
          _react2.default.createElement(
            _semanticUiReact.Item.Extra,
            null,
            _react2.default.createElement(
              _semanticUiReact.Button,
              { primary: true, floated: 'right' },
              'Submit',
              _react2.default.createElement(_semanticUiReact.Icon, { name: 'right chevron' })
            ),
            _react2.default.createElement(
              _semanticUiReact.Button,
              { floated: 'right' },
              'Info',
              _react2.default.createElement(_semanticUiReact.Icon, { name: 'right info circle' })
            ),
            _react2.default.createElement(_semanticUiReact.Label, { icon: 'user', content: 'Personal' })
          )
        )
      ),
      _react2.default.createElement(
        _semanticUiReact.Item,
        null,
        _react2.default.createElement(_semanticUiReact.Item.Image, { size: 'tiny', src: '/assets/images/wireframe/image.png' }),
        _react2.default.createElement(
          _semanticUiReact.Item.Content,
          null,
          _react2.default.createElement(
            _semanticUiReact.Item.Header,
            null,
            'Buck\'s Homebrew Stayaway'
          ),
          _react2.default.createElement(_semanticUiReact.Item.Meta, { content: '$1000 2 Weeks' }),
          _react2.default.createElement(
            _semanticUiReact.Item.Description,
            null,
            paragraph
          )
        )
      ),
      _react2.default.createElement(
        _semanticUiReact.Item,
        null,
        _react2.default.createElement(_semanticUiReact.Item.Image, { size: 'tiny', src: '/assets/images/wireframe/image.png' }),
        _react2.default.createElement(_semanticUiReact.Item.Content, { header: 'Arrowhead Valley Camp', meta: '$1200 1 Month' })
      )
    )
  );
};

exports.default = Dashboard;