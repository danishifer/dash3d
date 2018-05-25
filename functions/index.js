'use strict';

var _firebaseFunctions = require('firebase-functions');

var functions = _interopRequireWildcard(_firebaseFunctions);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _Login = require('./src/Login');

var _Login2 = _interopRequireDefault(_Login);

var _App = require('./src/App');

var _App2 = _interopRequireDefault(_App);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller');

var controller = _interopRequireWildcard(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_firebaseAdmin2.default.initializeApp({
    apiKey: "AIzaSyAu7OJskU1ma8Wt0tDHQfi5C9lAXiEVtA8",
    authDomain: "threed-printing-dashboard.firebaseapp.com",
    databaseURL: "https://threed-printing-dashboard.firebaseio.com",
    projectId: "threed-printing-dashboard",
    storageBucket: "threed-printing-dashboard.appspot.com",
    messagingSenderId: "959893611225"
});
// import StudentDashboard from './src/StudentDashboard'

controller.initialize();

var templates = {
    0: "dashboard.html",
    // 1: [],
    2: "admin_dashboard.html"
};

var dashboards = {
    0: _react2.default.createElement(_App2.default, null),
    2: _react2.default.createElement(_App2.default, null)
};

var app = (0, _express2.default)();
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.json());

app.get('login.js', function (req, res, next) {

    console.error('login.js');
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.use(_express2.default.static('public'));

var validateFirebaseIdToken = function validateFirebaseIdToken(req, res, next) {
    if (req.url === '/') return next();
    console.log('******** Validation Firebase ID Token for ' + req.url + ' ********');
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) && !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.', 'Make sure you authorize your request by providing the following HTTP header:', 'Authorization: Bearer <Firebase ID Token>', 'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    var idToken = void 0;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        if (req.url = '/dashboard') {
            res.redirect('/');
            return;
        }
        res.status(403).send('Unauthorized');
        return;
    }
    _firebaseAdmin2.default.auth().verifyIdToken(idToken).then(function (decodedIdToken) {
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        res.locals.user = req.user;
        return next();
    }).catch(function (error) {
        console.error('Error while verifying Firebase ID token:', error);
        if (req.url = '/dashboard') {
            res.redirect('/');
            return;
        }
        res.status(403).send('Unauthorized');
    });
};

app.use(validateFirebaseIdToken);
app.get('/', function (req, res) {
    _fs2.default.readFile('login.html', 'utf8', function (err, page) {
        var html = (0, _server.renderToString)(_react2.default.createElement(_Login2.default, null));
        var finalHtml = page.replace('<!-- ::APP:: -->', html);

        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(finalHtml);
    });
});

app.get('/dashboard', function (req, res) {
    controller.getUserRole(res.locals.user.uid, function (role) {
        _fs2.default.readFile(templates[role], 'utf8', function (err, page) {
            if (err) console.error(err);
            var html = (0, _server.renderToString)(dashboards[role]);
            var finalHtml = page.replace('<!-- ::APP:: -->', html);
            res.send(finalHtml);
        });
    });
});

app.get('/assignments/pending', function (req, res) {
    controller.getPendingAssignments(res.locals.user.uid, function (assignments) {
        res.json(assignments).status(200).end();
    });

    // console.log(controller.getUserRole(res.locals.user.uid));
    // res.json({
    //     "423565": {
    //         "title": "Biomimcry Project Prototype",
    //         "description": "Use Tinkercad to create a 3D model for your team's biomimicry project",
    //         "team": true,
    //         "due": "17 May 2018"
    //     },
    //     "312365": {
    //         "title": "Toothbrush Holder",
    //         "description": "Use your favorite modeling software to create a toothbrush holder",
    //         "team": false,
    //         "due": "30 May 2018"
    //     },
    //     "786543": {
    //         "title": "Solar System Model",
    //         "description": "Use OpenSCAD to design a 3D model representing the solar system model you made in science lesson",
    //         "team": true,
    //         "due": "20 June 2018"
    //     }
    // }).status(200).end();
});

app.get('/assignments/submitted', function (req, res) {
    controller.getSubmittedAssignments(res.locals.user.uid, function (assignments) {
        console.log(assignments);
        res.json(assignments).status(200).end();
    });
});

app.get('/assignment/:assignmentId/users', function (req, res) {
    controller.getUserForAssignment(req.params.assignmentId, function (users) {
        res.json(users).status(200).end();
    });
});

app.put('/assignment/:assignmentId/submit', function (req, res) {
    controller.submitAssignment(res.locals.user.uid, req.params.assignmentId, req.query.modelId, req.body, function (err) {
        res.json(err).status(200).end();
    });
});

app.get('/assignment/:assignmentId/info', function (req, res) {
    controller.getSubmittedAssignmentInfo(res.locals.user.uid, req.params.assignmentId, function (info) {
        res.json(info).status(200).end();
    });
});

app.put('/user', function (req, res) {
    controller.addUser(res.locals.user.uid, req.body, function (err) {
        res.json(err).status(200).end();
    });
});

exports.print3d = functions.https.onRequest(app);