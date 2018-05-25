import React, { Component } from 'react';
import { Form, Icon, Card, Label, Button } from 'semantic-ui-react';
// import './Assignment.css';
import InputMask from 'react-input-mask';
class Teacher {};

Teacher.Assignments = class TeacherAssignments extends Component {

    state = {
        assignments: [],
        title: "",
        meta: "",
        description: "",
        extra: "",
        addAssignmentCard: false
    };

    addAssignmentView() {
        this.setState({
            addAssignmentCard: true,
            title: "Add Assignment",
            description: (
                <Form style={{marginTop: "16px"}}>
                    <Form.Field>
                        <label>Assignment Title</label>
                        <input type="text" placeHolder="Enter Assignment Title..." />
                    </Form.Field>

                    <Form.TextArea label="Assignment Description" placeHolder="Enter Assignment Description..." />

                    <Form.Field>
                        <label>Due Date</label>
                        <InputMask mask="99-99-9999" maskChar="_" placeHolder="DD-MM-YYYY" />
                    </Form.Field>

                    <Form.Group inline>
                        <label>Type</label>
                        <Form.Radio label='Personal' value='p' />
                        <Form.Radio label='Team' value='t' />
                    </Form.Group>
                </Form>
            ),
            extra: (
                <div className="ui two buttons">
                    <Button basic color='blue' onClick={() => this.setState({ addAssignmentCard: false })}>Cancel</Button>
                    <Button primary content="Add" />
                </div>
            )
        })
    }

    componentDidMount() {
        fetch(Teacher.Assignments.url).then(res => res.json())
            .catch(e => alert(e))
            .then(data => {
                fetch(Teacher.Assignments.assignmentsUrl).then(res => res.json())
                    .catch(e => alert(e))
                    .then(submittedAssignments => {
                        let assignments = [];

                        for (let [id, value] of Object.entries(data).sort((a, b) => Date.parse(a[1].due) > Date.parse(b[1].due))) {
                            assignments.push(
                                <Teacher.Assignment
                                    key={id}
                                    title={value.title}
                                    due={value.due}
                                    description={value.description}
                                    team={value.team}
                                    membersSubmitted={value.membersSubmitted}
                                    fillament={value.fillament}
                                    printTime={value.printTime}
                                    submittedAssignments={submittedAssignments}
                                />
                            );
                        }

                        this.setState({
                            assignments: assignments
                        })
                    })
            })
    }

    render() {
        return (
            <Card.Group>
                {
                    this.state.addAssignmentCard ?
                    <Card
                        header={this.state.title}
                        meta={this.state.meta}
                        description={this.state.description}
                        extra={this.state.extra}
                    />
                    :
                    <Card>
                        <Card.Description style={{height: "100%"}}>
                            <Button basic fluid color='blue' style={{ height: "100%" }} content='Add Assignment' icon='add' onClick={this.addAssignmentView.bind(this)} />
                        </Card.Description>
                    </Card>
                }
                {this.state.assignments}
            </Card.Group>
        );
    }
}

Teacher.Assignment = class TeacherAssignment extends Component {

    state = {
        title: "",
        meta: "",
        description: "",
        extra: ""
    }

    statuses = {
        0: { icon: "clock", name: "Pending" },
        1: { icon: "print", name: "Printing" },
        2: { icon: "checkmark", name: "Done" }
    }

    componentDidMount() {
        this.setInfoView();
    }

    setInfoView = () => {
        this.setState({
            title: this.props.title,
            meta: (
                <Card.Meta>
                    <span><Icon name={this.props.team ? "users" : "user"} /> {this.props.team ? "Team" : "Personal"}</span>
                    <span>&nbsp;&bull;&nbsp;</span>
                    <span><Icon name="clock" /> {this.props.due}</span>
                </Card.Meta>
            ),
            description: this.props.description,
            extra: (
                <Button fluid basic color='blue' icon='chevron down' content='Info' onClick={this.setStatisticsView.bind(this)} />    
            )
        })
    }

    setSubmittedView = () => {
        this.setState({
            description: (
                <div style={{ marginTop: "16px" }}>
                    <h5 className="infoLabel">Submitted By</h5>
                    <ul>
                        {this.props.membersSubmitted.map(submission => <li key={submission.assignmentId} className="teamParticipant"><a>{submission.members.map((obj, index) => <span className="teamParticipant">{obj}{submission.members.length > (index + 1) && ", "}</span>)}</a></li>)}
                    </ul>
                </div>
            ),
            extra: (
                <Button fluid basic color='blue' icon='chevron left' content='Back' onClick={this.setStatisticsView.bind(this)} />  
            )
        });
    }

    setAssignmentView = (assignmentId, onBack) => {
        const assignment = this.props.submittedAssignments[assignmentId]
        this.setState({
            title: assignment.title,
            meta: (
                <Card.Meta>
                    <span><Icon name={this.statuses[assignment.status].icon} /> {this.statuses[assignment.status].name}</span>
                </Card.Meta>
            ),
            description: (
                <div style={{marginTop: "16px"}}>
                    <h5 className="infoLabel">Submitted By</h5>
                    <p>{assignment.members.map((obj, index) => <span className="teamParticipant">{obj}{assignment.members.length > (index + 1) && ", "}</span>)}</p>

                    <h5 className="infoLabel">Submitted On</h5>
                    <p>{assignment.submissionDate}</p>

                    <h5 className="infoLabel">Model Description</h5>
                    <p>{assignment.description}</p>

                    <h5 className="infoLabel">Fillament Used <span className="extra">(Estimated)</span></h5>
                    <p>{this.props.fillament}mg</p>

                    <h5 className="infoLabel">Print Time <span className="extra">(Estimated)</span></h5>
                    <p>{this.props.printTime} Hours</p>
                </div>
            ),
            extra: (
                <div className="ui two buttons">
                    <Button basic color='blue' icon='chevron left' content='Back' onClick={onBack} />  
                    <Button primary icon='download' content='STL' onClick={() => alert("Download")} />
                </div>
                
            )
        })
    }

    setStatisticsView = () => {
        this.setState({
            title: this.props.title,
            meta: (
                <Card.Meta>
                    <span><Icon name={this.props.team ? "users" : "user"} /> {this.props.team ? "Team" : "Personal"}</span>
                    <span>&nbsp;&bull;&nbsp;</span>
                    <span><Icon name="clock" /> {this.props.due}</span>
                </Card.Meta>
            ),
            description: (
                <div style={{ marginTop: "16px" }}>
                    <h5 className="infoLabel">Assignment Description</h5>
                    <p>{this.props.description}</p>

                    <h5 className="infoLabel">Submitted By</h5>
                    
                        {
                            (() => {
                                let membersArray = this.props.membersSubmitted
                                let membersArrayCollapsed = membersArray.slice(0, 3);

                                return (
                                    <ul>
                                        {
                                                membersArrayCollapsed.map(submission => {
                                                    return (
                                                        <li key={submission.assignmentId} className="teamParticipant">
                                                            <a onClick={this.setAssignmentView.bind(this, submission.assignmentId, this.setStatisticsView.bind(this))}>
                                                                {submission.members.map((obj, index) => <span className="teamParticipant">{obj}{submission.members.length > (index + 1) && ", "}</span>)}
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                        }
                                        {
                                            membersArray.length > 3 &&
                                            <li><a onClick={this.setSubmittedView.bind(this)}><strong>View All...</strong></a></li>
                                        }
                                    </ul>
                                );
                            })()
                        }

                    <h5 className="infoLabel">Fillament Used <span className="extra">(Estimated)</span></h5>
                    <p>{this.props.fillament}mg</p>

                    <h5 className="infoLabel">Print Time <span className="extra">(Estimated)</span></h5>
                    <p>{this.props.printTime} Hours</p>
                </div>
            ),
            extra: (
                <Button fluid basic color='blue' icon='chevron up' content='Info' onClick={this.setInfoView.bind(this)} />  
            )
        });
    }

    render() {
        return (
            <Card
                header={this.state.title}
                meta={this.state.meta}
                description={this.state.description}
                extra={this.state.extra}
            />
        )
    }
}

Teacher.Assignments.url = 'http://www.mocky.io/v2/5affdee7310000730076de9c';
Teacher.Assignments.assignmentsUrl = 'http://www.mocky.io/v2/5affe6b5310000550076dead';

export default Teacher;