import React, { Component } from 'react';
import {Container, Card,Button} from 'semantic-ui-react'
import CreateItemModal from './createItem'
import { Storage } from 'aws-amplify';

class ItemDashboard extends Component {


lister = () => {
  Storage.list('')
  .then(result => console.log(result))
  .catch(err => console.log(err));
}
render() {
    return (
      <div>
       <CreateItemModal/>
        <Container style={{padding: 10}}>
        <Button onClick={this.lister}>Lister</Button>
          <Card.Group>
              <Card>
              <Card.Content>
                <Card.Header>
                    Item Name
                </Card.Header>
                <Card.Meta>
                  Item Price
                </Card.Meta>
                <Card.Description>
                  Description of the Item
                </Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
      </Container>
      </div>
    );
  }
}
export default ItemDashboard;
