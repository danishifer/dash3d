import uuid from 'uuid/v4';
import admin from 'firebase-admin';
import dateFormat from 'dateformat';

let databaseRef, users;

const initialize = () => {
    databaseRef = admin.database().ref();
}


const _getAssignments = callback => {
    // if (assignments) { callback(assignments); return; }
    databaseRef.child('/assignments').once('value', snap => {
        callback(snap.val())
    })
};

const _getUsers = (callback, force=false) => {
    if (users && !force) { console.log(`Hot Reloading Users (${users})`); callback(users); return; }
    databaseRef.child('/users').once('value').then(snap => {
        console.log('Full Reloading Users');
        users = snap.val();
        callback(snap.val())
    })
}

const _getUserSubmissions = (uid, callback, force=false) => {
    _getUsers(users => {
        callback(users[uid].submissions)
    }, force);
    // databaseRef.child('/users').child(uid).child('submissions').once('value', snap => callback(snap.val()))
}


const getUserRole = (uid, callback) => {
    _getUsers(users => {
        callback(users[uid].role)
    });
};

const getPendingAssignments = (uid, callback) => {
    _getUserSubmissions(uid, submissions => {
        _getAssignments(assignments => {
            callback(Object.entries(assignments).filter(assignment => (!submissions || !(assignment[0] in submissions))))
        });
    }, true);
};

const getSubmittedAssignments = (uid, callback) => {
    _getUserSubmissions(uid, submissions => {
        _getAssignments(assignments => {
            if (!submissions) { callback([]); return; }
            callback(Object.entries(assignments).filter(assignment => {return (assignment[0] in submissions)}))
        });
    }, true);
};

const getSubmittedAssignmentInfo = (uid, assignmentId, callback) => {
    _getUserSubmissions(uid, submissions => {
        console.log("submissions:", submissions)
        callback(submissions[assignmentId])
    });
}

const getUserForAssignment = (assignmentId, callback) => {
    _getUsers(users => {
        let usersList = [];
        Object.entries(users).forEach(user => {
            if ((!user[1].submissions || !(assignmentId in user[1].submissions)) && user[1].role < 2) {
                usersList.push({ value: user[0], text: user[1].name })
            }
        })

        callback(usersList);
    })
}

const submitAssignment = (uid, assignmentId, modelId, formData, callback) => {
    let data = {
        description: formData.description,
        fileExtension: formData.fileExtension,
        modelId
    }
    
    if (formData.isTeam) {
        _getUsers(users => {
            let team = {}
            formData.team.forEach(member => {
                team[member] = users[member].name
            })
            data.teamMembers = team
            _submitAssignment(uid, assignmentId, data, err => {
                callback(err);
            });
        });
    } else {
        _submitAssignment(uid, assignmentId, data, err => {
            callback(err);
        });
    }
    
    
}

const _submitAssignment = (uid, assignmentId, data, callback) => {
    console.log(data);
    databaseRef.child('/users').child(uid).child('submissions').child(assignmentId).set(data, snap => {
        callback({});
    })
}

const addUser = (uid, body, callback) => {
    let data = body;
    console.log(data)
    data.dateCreated = dateFormat(new Date(), "dd mmmm yyyy");
    data.role = 0;
    console.log(data)
    databaseRef.child('/users').child(uid).set(data, snap => {
        _getUsers(() => {
            callback({})
        }, true)
    });
}

module.exports = {
    initialize,
    getUserRole,
    getPendingAssignments,
    getSubmittedAssignments,
    getUserForAssignment,
    submitAssignment,
    getSubmittedAssignmentInfo,
    addUser
};
