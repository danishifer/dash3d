import * as functions from 'firebase-functions';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import React from 'react';
import { renderToString } from 'react-dom/server';
import Login from './src/Login';
import App from './src/App';
// import StudentDashboard from './src/StudentDashboard'
import express from 'express';
import fs from 'fs';
import * as controller from './controller';

admin.initializeApp({
    apiKey: "AIzaSyAu7OJskU1ma8Wt0tDHQfi5C9lAXiEVtA8",
    authDomain: "threed-printing-dashboard.firebaseapp.com",
    databaseURL: "https://threed-printing-dashboard.firebaseio.com",
    projectId: "threed-printing-dashboard",
    storageBucket: "threed-printing-dashboard.appspot.com",
    messagingSenderId: "959893611225"
});
controller.initialize();

const templates = {
    0: "dashboard.html",
    // 1: [],
    2: "admin_dashboard.html"
}

const dashboards = {
    0: <App />,
    2: <App />
}

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.get('login.js', function (req, res, next) {
    
    console.error('login.js');
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.use(express.static('public'));

const validateFirebaseIdToken = (req, res, next) => {
    if (req.url === '/') return next();
    console.log(`******** Validation Firebase ID Token for ${req.url} ********`)
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }

    let idToken;
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
    admin.auth().verifyIdToken(idToken).then((decodedIdToken) => {
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        res.locals.user = req.user;
        return next();
    }).catch((error) => {
        console.error('Error while verifying Firebase ID token:', error);
        if (req.url = '/dashboard') {
            res.redirect('/');
            return;
        }
        res.status(403).send('Unauthorized');
    });
};

app.use(validateFirebaseIdToken);
app.get('/', (req, res) => {
    fs.readFile('login.html', 'utf8', (err, page) => {
        const html = renderToString(<Login />);
        const finalHtml = page.replace('<!-- ::APP:: -->', html);

        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(finalHtml);
    })
});

app.get('/dashboard', (req, res) => {
    controller.getUserRole(res.locals.user.uid, role => {
        fs.readFile(templates[role], 'utf8', (err, page) => {
            if (err) console.error(err);
            const html = renderToString(dashboards[role]);
            const finalHtml = page.replace('<!-- ::APP:: -->', html);
            res.send(finalHtml);
        });
    });
});

app.get('/assignments/pending', (req, res) => {
    controller.getPendingAssignments(res.locals.user.uid, assignments => {
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

app.get('/assignments/submitted', (req, res) => {
    controller.getSubmittedAssignments(res.locals.user.uid, assignments => {
        console.log(assignments)
        res.json(assignments).status(200).end();
    });
});

app.get('/assignment/:assignmentId/users', (req, res) => {
    controller.getUserForAssignment(req.params.assignmentId, users => {
        res.json(users).status(200).end();
    })
});

app.put('/assignment/:assignmentId/submit', (req, res) => {
    controller.submitAssignment(res.locals.user.uid, req.params.assignmentId, req.query.modelId, req.body, err => {
        res.json(err).status(200).end()
    });
})

app.get('/assignment/:assignmentId/info', (req, res) => {
    controller.getSubmittedAssignmentInfo(res.locals.user.uid, req.params.assignmentId, info => {
        res.json(info).status(200).end();
    })
});

app.put('/user', (req, res) => {
    controller.addUser(res.locals.user.uid, req.body, err => {
        res.json(err).status(200).end();
    })
});

exports.print3d = functions.https.onRequest(app);