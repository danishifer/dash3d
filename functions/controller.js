'use strict';

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

var _dateformat = require('dateformat');

var _dateformat2 = _interopRequireDefault(_dateformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var databaseRef = void 0,
    users = void 0;

var initialize = function initialize() {
    databaseRef = _firebaseAdmin2.default.database().ref();
};

var _getAssignments = function _getAssignments(callback) {
    // if (assignments) { callback(assignments); return; }
    databaseRef.child('/assignments').once('value', function (snap) {
        callback(snap.val());
    });
};

var _getUsers = function _getUsers(callback) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (users && !force) {
        console.log('Hot Reloading Users (' + users + ')');callback(users);return;
    }
    databaseRef.child('/users').once('value').then(function (snap) {
        console.log('Full Reloading Users');
        users = snap.val();
        callback(snap.val());
    });
};

var _getUserSubmissions = function _getUserSubmissions(uid, callback) {
    var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _getUsers(function (users) {
        callback(users[uid].submissions);
    }, force);
    // databaseRef.child('/users').child(uid).child('submissions').once('value', snap => callback(snap.val()))
};

var getUserRole = function getUserRole(uid, callback) {
    _getUsers(function (users) {
        callback(users[uid].role);
    });
};

var getPendingAssignments = function getPendingAssignments(uid, callback) {
    _getUserSubmissions(uid, function (submissions) {
        _getAssignments(function (assignments) {
            callback(Object.entries(assignments).filter(function (assignment) {
                return !submissions || !(assignment[0] in submissions);
            }));
        });
    }, true);
};

var getSubmittedAssignments = function getSubmittedAssignments(uid, callback) {
    _getUserSubmissions(uid, function (submissions) {
        _getAssignments(function (assignments) {
            if (!submissions) {
                callback([]);return;
            }
            callback(Object.entries(assignments).filter(function (assignment) {
                return assignment[0] in submissions;
            }));
        });
    }, true);
};

var getSubmittedAssignmentInfo = function getSubmittedAssignmentInfo(uid, assignmentId, callback) {
    _getUserSubmissions(uid, function (submissions) {
        console.log("submissions:", submissions);
        callback(submissions[assignmentId]);
    });
};

var getUserForAssignment = function getUserForAssignment(assignmentId, callback) {
    _getUsers(function (users) {
        var usersList = [];
        Object.entries(users).forEach(function (user) {
            if ((!user[1].submissions || !(assignmentId in user[1].submissions)) && user[1].role < 2) {
                usersList.push({ value: user[0], text: user[1].name });
            }
        });

        callback(usersList);
    });
};

var submitAssignment = function submitAssignment(uid, assignmentId, modelId, formData, callback) {
    var data = {
        description: formData.description,
        fileExtension: formData.fileExtension,
        modelId: modelId
    };

    if (formData.isTeam) {
        _getUsers(function (users) {
            var team = {};
            formData.team.forEach(function (member) {
                team[member] = users[member].name;
            });
            data.teamMembers = team;
            _submitAssignment(uid, assignmentId, data, function (err) {
                callback(err);
            });
        });
    } else {
        _submitAssignment(uid, assignmentId, data, function (err) {
            callback(err);
        });
    }
};

var _submitAssignment = function _submitAssignment(uid, assignmentId, data, callback) {
    console.log(data);
    databaseRef.child('/users').child(uid).child('submissions').child(assignmentId).set(data, function (snap) {
        callback({});
    });
};

var addUser = function addUser(uid, body, callback) {
    var data = body;
    console.log(data);
    data.dateCreated = (0, _dateformat2.default)(new Date(), "dd mmmm yyyy");
    data.role = 0;
    console.log(data);
    databaseRef.child('/users').child(uid).set(data, function (snap) {
        _getUsers(function () {
            callback({});
        }, true);
    });
};

module.exports = {
    initialize: initialize,
    getUserRole: getUserRole,
    getPendingAssignments: getPendingAssignments,
    getSubmittedAssignments: getSubmittedAssignments,
    getUserForAssignment: getUserForAssignment,
    submitAssignment: submitAssignment,
    getSubmittedAssignmentInfo: getSubmittedAssignmentInfo,
    addUser: addUser
};