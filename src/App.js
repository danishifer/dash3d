import React, { Component } from 'react';
import { Menu, Label, Transition, Segment, Form, Card, Icon, Divider, Header, Button, Sidebar } from 'semantic-ui-react';
import Login from './Login';
import AppHeader from './AppHeader';
import Assignments from './Assignments';
import Tab from './Tab';
import AppSidebar from './Sidebar';

// import './Sidebar.css';
// import './App.css';



class App extends Component {

	state = {
		sidebarOpen: true,
		tab: 'assignments'
	};

	toggleSidebar() {
		this.setState({
			sidebarOpen: !this.state.sidebarOpen
		});
	}

	changeTab = (e, data) => {
		this.setState({
			tab: data.name
		});
	}

  	render() {
    	return (
			<div className='app'>
				<AppHeader onMenuClick={this.toggleSidebar.bind(this)} />

				<Sidebar.Pushable className="sidebar">
					<AppSidebar visible={this.state.sidebarOpen} tab={this.state.tab} onChange={this.changeTab.bind(this)} />

					<Sidebar.Pusher>
						<Segment basic style={{paddingTop: "32px", width: this.state.sidebarOpen ? "80%" : "100%"}}>

							<div className="contentContainer">
								<Tab.Assignments active={this.state.tab === 'assignments'} />
								<Tab.PrinterManager.Queue active={this.state.tab === 'queue'} />
								<Tab.Teacher.Assignments active={this.state.tab === 'teacher-assignments'} />
							</div>

						</Segment>
					</Sidebar.Pusher>
				</Sidebar.Pushable>
			
			</div>
    	);
  	}
}

export default App;
