import React from 'react'
import { Image as ImageComponent, Item, Icon, Card, Label, Button } from 'semantic-ui-react'

const paragraph = <ImageComponent src='/assets/images/wireframe/short-paragraph.png' />

const Dashboard = () => (
  <Card style={{width: "1024px", padding: "16px"}}>
  <Item.Group divided>
    <Item>
      <Item.Content>
        <Item.Header>Biomimicry Project Prototype</Item.Header>
        <Item.Meta>
          <span className='price'>12th May 2018</span>
        </Item.Meta>
        <Item.Description>
            Create a 3D model in Tinkercad
            for your team’s biomimcry project prototype
        </Item.Description>
        <Item.Extra>
            <Button primary floated='right'>
              Submit
              <Icon name='right chevron' />
            </Button>
            <Button floated='right'>
              Info
              <Icon name='right info circle' />
            </Button>
            <Label icon='user' content='Personal' />
        </Item.Extra>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='tiny' src='/assets/images/wireframe/image.png' />

      <Item.Content>
        <Item.Header>Buck's Homebrew Stayaway</Item.Header>
        <Item.Meta content='$1000 2 Weeks' />
        <Item.Description>{paragraph}</Item.Description>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image size='tiny' src='/assets/images/wireframe/image.png' />
      <Item.Content header='Arrowhead Valley Camp' meta='$1200 1 Month' />
    </Item>
  </Item.Group>
  </Card>
)

export default Dashboard
