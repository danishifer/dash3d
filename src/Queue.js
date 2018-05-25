import React, { Component } from 'react';
import { Confirm, Form, Card, Label, Button } from 'semantic-ui-react';
// import './Assignment.css';

class Queue extends Component {

    state = {
        items: []
    }
    
    componentDidMount() {
        fetch(Queue.urls[this.props.done ? "done" : "pending"]).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(data => {
                let items = [];

                let dataArray = Object.entries(data).sort((a, b) => {
                    if (a[1].status === 1) return -1;
                    if (b[1].status === 1) return 1;
                    return Date.parse(a[1].due) > Date.parse(b[1].due)
                })
                
                for (let [id, value] of dataArray) {
                    items.push(
                        <Queue.Item
                            key={id}
                            title={value.title}
                            user={value.user}
                            description={value.description}
                            due={value.due}
                            status={value.status}
                        />
                    );
                }
                
                this.setState({
                    loading: false,
                    items: items
                })
            });
    }

    render() {
        return (
            <Card.Group>
                {this.state.items}
            </Card.Group>
        )
    }

}

Queue.Item = class QueueItem extends Component {
    statuses = {
        0: { icon: "clock", name: "Pending", action: { icon: "print", name: "Print", onClick: () => this.setSubmitView() } },
        1: { icon: "print", name: "Printing", color: "green", action: { icon: "checkmark", name: "Done", onClick: () => this.setState({ doneConfirmOpen: true }) } },
        2: { icon: "checkmark", name: "Done" }
    }

    state = {
        title: "",
        meta: "",
        description: "",
        tags: "",
        actions: "",
        doneConfirmOpen: false
    }

    componentDidMount() {
        this.setInfoView()
    }

    setInfoView = () => {
        let statusData = this.statuses[this.props.status]

        this.setState({
            title: this.props.title,
            meta: this.props.user.name,
            description: this.props.description,
            tags: (
                <span>
                    <Label color={statusData.color} icon={statusData.icon} content={statusData.name} />
                    <Label icon='calendar' content={this.props.due} />
                </span>
            ),
            actions: (
                <div className='ui two buttons'>
                    <Button basic color='blue' icon="download" content='STL' onClick={() => window.location='https://google.com'} />
                    {
                        statusData.action &&
                        <Button primary icon={statusData.action.icon} content={statusData.action.name} onClick={statusData.action.onClick}/>
                    }                    
                </div>
            )
        });
    }

    setSubmitView = () => {
        this.setState({
            description: <Queue.Item.Submit />,
            actions: <Queue.Item.Submit.Actions onCancel={this.setInfoView}/>,
            tags: null
        });
    }

    render() {
        return (
            <Card>
                <Confirm
                    header='Set Assignment As Done'
                    content={'Are you sure you want to set this assignment as Done?'}
                    open={this.state.doneConfirmOpen}
                    onCancel={() => this.setState({ doneConfirmOpen: false })}
                    onConfirm={() => this.setState({ doneConfirmOpen: false })}
                />
                <Card.Content>
                    <Card.Header content={this.state.title}/>
                    <Card.Meta>{this.state.meta}</Card.Meta>
                    <Card.Description>{this.state.description}</Card.Description>
                </Card.Content>

                { this.state.tags && <Card.Content extra content={this.state.tags} />}

                <Card.Content extra>
                    {this.state.actions}
                </Card.Content>
            </Card>
        )
    }
}

Queue.Item.Submit = class QueueItemSubmit extends Component {
    render() {
        return (
            <div style={{marginTop: "16px"}}>
                <Form>
                    <Form.Field>
                        <label>STL Model</label>
                        <Button fluid icon="download" onClick={() => alert("Download STL")} content="Download STL Model" />
                    </Form.Field>

                    <Form.Field>
                        <label>Estimated Fillament Usage <span className="extra">(mg)</span></label>
                        <input placeholder='2' />
                    </Form.Field>

                    <Form.Field>
                        <label>Estimated Print Time <span className="extra">(hours)</span></label>
                        <input placeholder='4' />
                    </Form.Field>
                </Form>
            </div>
        );
    }
}

Queue.Item.Submit.Actions = (props) => {
    return (
        <div className='ui two buttons'>
            <Button basic color='blue' content='Cancel' onClick={props.onCancel} />
            <Button primary content='Set As Printing' onClick={props.onPrint}/>
        </div>
    );
}

Queue.urls = {
    'pending': 'http://www.mocky.io/v2/5afd8d643200008d00f1ad1f',
    'done': 'http://www.mocky.io/v2/5afe84453200007f00222ec3'
}


export default Queue;