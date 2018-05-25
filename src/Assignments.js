import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Loader } from 'semantic-ui-react';
import Assignment from './Assignment';

class Assignments extends Component {
    state = {
        assignments: [],
        loading: true
    }

    componentDidMount() {
        fetch(Assignments.urls[this.props.type], {
            credentials: 'include',
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                let assignments = [];

                if (this.props.type === 'submitted') {
                    if (Object.entries(data).length === 0) {
                        this.setState({
                            loading: false,
                            assignments: <p style={{marginLeft: "8px", color: "gray"}}>No {this.props.type === 'pending' ? "Pending" : "Submitted"} Assignments</p>
                        })
                        return;
                    }

                    Object.entries(data).forEach((assignment, index) => {

                        let id = assignment[1][0]
                        let value = assignment[1][1]

                        
                        fetch(`/assignment/${id}/info`, { credentials: 'include' }).then(res => res.json())
                            .catch(e => console.error(e))
                            .then(info => {
                                assignments.push(<Assignment
                                    key={id}
                                    id={id}
                                    title={value.title}
                                    team={value.team}
                                    due={value.due}
                                    description={value.description}
                                    type={this.props.type}
                                    fillament={info.fillament}
                                    printTime={info.printTime}
                                    status={info.status}
                                    teamParticipants={info.teamMembers}
                                    modelId={info.modelId}
                                    modelDescription={info.description}
                                    fileExtension={info.fileExtension}
                                />)

                            this.setState({
                                loading: false,
                                assignments: assignments
                            })
                        })
                    })
                } else {
                    let assignments = data.map(assignment => {
                        let id = assignment[0]
                        let value = assignment[1]
                        return <Assignment
                            key={id}
                            id={id}
                            title={value.title}
                            team={value.team}
                            due={value.due}
                            description={value.description}
                            type={this.props.type}
                        />
                    })

                    this.setState({
                        loading: false,
                        assignments: assignments.length > 0 ? assignments
                        :
                        <p style={{marginLeft: "8px", color: "gray"}}>No {this.props.type === 'pending' ? "Pending" : "Submitted"} Assignments</p>
                    })
                }
                
                
                
            });
    }

    render() {
        return (
            <div>
                <div style={{display: this.state.loading ? "block" : "none"}}>
                    <Loader active={this.state.loading} inline />
                    <span style={{"fontFamily": "Lato"}}>&nbsp;&nbsp;&nbsp;Loading...</span>
                </div>

                <Card.Group>
                    {this.state.assignments}
                </Card.Group>
            </div>
        );
    }
}

Assignments.types = {
    pending: 'pending',
    submitted: 'submitted'
};

Assignments.urls = {
    pending: 'assignments/pending',
    submitted: 'assignments/submitted',
}


export default Assignments;
