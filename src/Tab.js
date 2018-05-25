import React, { Component } from 'react';
import { Form, Item, Label, Button, Segment, Card } from 'semantic-ui-react';
import Assignments from './Assignments';
import Queue from './Queue';
import Teacher from './Teacher';

const Tab = props => {
    return (
        <div style={{display: props.active ? "block" : "none"}}>
            {props.children}
        </div>
    );
}

Tab.Assignments = class TabAssignment extends Component {
	render() {
		return (
			<Tab active={this.props.active}>
				<h1>Assignments To Submit</h1>
				<Assignments type={Assignments.types.pending} />
				<br /><br />
				<h1>Submitted Assignments</h1>
				<Assignments type={Assignments.types.submitted}/>
			</Tab>
		)
	}
}

Tab.PrinterManager = {};
Tab.PrinterManager.Queue = class TabQueue extends Component {
    render() {
        return (
            <Tab active={this.props.active}>
                <h1>Pending / Printing</h1>
                <Queue />

                <h1>Done</h1>
                <Queue done />
            </Tab>
        )
    }
}

Tab.Teacher = {};
Tab.Teacher.Assignments = class TabTeacherAssignments extends Component {
    render() {
        return (
            <Tab active={this.props.active}>
                <h1>Manage Assignments</h1>
                <Teacher.Assignments />
            </Tab>
        );
    }
}

export default Tab;