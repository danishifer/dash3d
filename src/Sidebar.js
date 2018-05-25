import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';

const AppSidebar = props => {
    return (
        <Sidebar as={Menu} animation='push' visible={props.visible} vertical inverted size="large" className="sidebar">
            <Menu.Item>
                <Menu.Header>Student</Menu.Header>
                <Menu.Menu>
                    <Menu.Item active={props.tab === 'assignments'} as='a' name='assignments' icon="clipboard" content="Assignments" onClick={props.onChange} />
                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                <Menu.Header>Printer Manager</Menu.Header>
                <Menu.Menu>
                    <Menu.Item active={props.tab === 'queue'} as='a' name='queue' icon="list" content="Queue" onClick={props.onChange} />
                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                <Menu.Header>Teacher</Menu.Header>
                <Menu.Menu>
                    <Menu.Item active={props.tab === 'teacher-assignments'} as='a' name='teacher-assignments' icon="clipboard" content="Assignments" onClick={props.onChange} />
                </Menu.Menu>
            </Menu.Item>

            <span className="footnotes">© 2018 Dani Shifer</span>
        </Sidebar>
    );
};


export default AppSidebar;
