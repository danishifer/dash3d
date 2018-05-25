import React, { Component } from 'react';
import { Segment, Dimmer, Loader, Card, Button, Icon, Label, Form } from 'semantic-ui-react';
import firebase from 'firebase/app';
import 'firebase/storage';
import uuid from 'uuid/v4';
import download from './download';
// import './Assignment.css'

class Assignment extends Component {
    
    state = {
        title: "",
        meta: "",
        description: "",
        extra: "",
        uploaded: false,
        users: [],
        file: null,
        teamMembers: [],
        modelDescription: "",
        loading: false
    }

    componentWillMount() {
        fetch(`assignment/${this.props.id}/users`, {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => alert(`Error: ${error}`))
            .then(data => {
                this.setState({
                    users: data
                });
            });
    }

    componentDidMount() {
        this.setInfoView();
    }

    setMoreInfoView = () => {
        this.setState({
            description: (
                <div style={{marginTop: "16px"}}>
                    <h5 className="infoLabel">Assignement Description</h5>
                    <p>{this.props.description}</p>

                    <h5 className="infoLabel">Model Description</h5>
                    <p>{this.props.modelDescription}</p>

                    <h5 className="infoLabel">Team Participants</h5>
                    
                    <p>
                        {Object.entries(this.props.teamParticipants).map((member, index) => 
                            <span className="teamParticipant">{member[1]}{Object.entries(this.props.teamParticipants).length > (index + 1) && ", "}</span>
                        )}
                    </p>

                    { this.props.fillament && 
                        <div>
                            <h5 className="infoLabel">Fillament Used <span className="extra">(Estimated)</span></h5>
                            <p>{this.props.fillament}mg</p>
                        </div>
                    }

                    { this.props.printTime &&
                        <div>
                            <h5 className="infoLabel">Print Time <span className="extra">(Estimated)</span></h5>
                            <p>{this.props.printTime} Hours</p>
                        </div>
                    }

                    
                </div>
            ),
            extra: (
                <div className='ui two buttons'>
                    <Button primary icon="download" content='STL' onClick={() => window.location = Assignment.urls.model.replace("{}", this.props.id)} />
                    <Button basic color='blue' icon="chevron up" content='Info' onClick={this.setInfoView.bind(this)} />
                </div>
            )
        })
    }

    setInfoView = () => {
        this.setState({
            title: this.props.title,
            meta: (
                <Card.Meta>
                    {
                        this.props.status &&
                        <span>
                            <span><Icon name={this.props.status === 1 ? "print": "clock"} /> {this.props.status === 1 ? "Printing" : "Pending"}</span>
                            <span>&nbsp;&bull;&nbsp;</span>
                        </span>
                    }

                    <span><Icon name={this.props.team ? "users" : "user"} /> {this.props.team ? "Team" : "Personal"}</span>
                    
                    {
                        !this.props.status &&
                        <span>
                            <span>&nbsp;&bull;&nbsp;</span>
                            <span><Icon name="clock" /> {this.props.due}</span>
                        </span>
                    }
                    
                </Card.Meta>
            ),
            description: this.props.description,
            extra: (
                this.props.type === 'submitted' ?
                <div className='ui two buttons'>
                    <Button primary icon="download" content='STL' onClick={() => {
                        firebase.storage().ref(`models/${this.props.modelId}.${this.props.fileExtension}`).getDownloadURL().then(url => {
                            console.log(url);
                            download(url)
                        })
                    }} />

                    <Button basic color='blue' icon="chevron down" content='Info' onClick={this.setMoreInfoView.bind(this)} />
                </div>
                :
                <Button primary fluid content='Submit' onClick={this.setSubmitView.bind(this)} />
            )
        });
    }

    changeFile = e => {
        this.setState({
            file: e.target.files[0]
        }, () => {
            this.setSubmitView()
        });
    }

    setSubmitView = () => {
        let modelUpload;
        
        this.setState({
            description: (
                <div style={{ marginTop: "16px" }}>
                    <Form>
                        <input type="file" id="model" name='model' ref={inst => modelUpload = inst} style={{ display: "none" }} onChange={this.changeFile.bind(this)} />
                        <Form.Field>
                            <label>STL Model</label>
                            <Button fluid as='div' labelPosition='left' onClick={() => modelUpload.click()}>
                                <Label
                                    as='a'
                                    basic
                                    style={{ flex: 1, color: this.state.file ? "black" : "#c8c8c8" }}
                                    content={this.state.file ? this.state.file.name : "Upload..."}
                                />
                                <Button icon='upload' />
                            </Button>
                        </Form.Field>

                        {
                            this.props.team &&
                            <Form.Dropdown value={this.state.teamMembers} label='Team Participants' placeholder='Add Participants' noResultsMessage='No participants available.' fluid multiple search selection options={this.state.users} onChange={(e, {value}) => {this.setState({ teamMembers: value}, () => this.setSubmitView())}}/>
                        }

                        <Form.TextArea label='Model Description' placeholder='Enter Model Description' value={this.state.modelDescription} onChange={(e, { value }) => this.setState({ modelDescription: value }, () => this.setSubmitView())}/>
                    </Form>
                </div>
            ),
            extra: (
                <div className='ui two buttons'>
                    <Button basic color='blue' onClick={this.setInfoView.bind(this)}>Cancel</Button>
                    <Button primary onClick={() => {
                        this.setState({ loading: true })
                        let modelId = uuid();
                        let filename = `${modelId}.${this.state.file.name.split('.').pop()}`;
                        let fileExtension = this.state.file.name.split('.').pop();

                        firebase.storage().ref('models').child(filename).put(this.state.file).then(snap => {
                            let reqBody = {
                                description: this.state.modelDescription,
                                isTeam: this.props.team,
                                fileExtension
                            };
                            
                            if (this.props.team) reqBody.team = this.state.teamMembers;
                            
                            fetch(`assignment/${this.props.id}/submit?modelId=${modelId}`, {
                                method: 'PUT',
                                credentials: 'include',
                                body: JSON.stringify(reqBody),
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            }).then(res => res.json())
                            .catch(e => alert(e))
                            .then(data => {
                                window.location.reload();
                            })
                        });

                    }}>Submit</Button>
                </div>
            )
        });
    }

    render() {
        return (
                

                <Card>
                    <Dimmer active={this.state.loading}>
                        <Loader>Loading...</Loader>
                    </Dimmer>
                    <Card.Content>
                        <Card.Header>{this.state.title}</Card.Header>
                        <Card.Meta>{this.state.meta}</Card.Meta>
                        <Card.Description>{this.state.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    {this.state.extra}
                    </Card.Content>
                    
                </Card>
            
            
                
            
        );
    }
}

export default Assignment;