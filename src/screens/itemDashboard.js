import React, { Component } from 'react';
import {Container, Card,Button} from 'semantic-ui-react'
import CreateItemModal from './createItem'
import { Storage } from 'aws-amplify';

class ItemDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      card_names:null
    }
  }


lister = () => {
  Storage.list('Markesian')
  .then(res => console.log(res))
  .catch(err => console.log(err))
  // Storage.list('card_names')
  // .then(res => {
  //   console.log(res)
  //   window.reso = res
  //   var card_names_split = []
  //   for (var i = 0 ; i < res.length+1 ; i++) {
  //     var splitname = d.key.split('/')[1]
  //     // card_names_split.push(splitname)
  //
  //   }
  // })
  // .catch(err => console.log(err))



  // Storage.put('card_names/yeso','')
  //   .then(res => {
  //     console.log(res)
  //     window.reso = res
  //   })
  //   .catch(err => console.log(err))
  // Storage.get('cardDirectory.json')
  //   .then(res => {
  //     console.log(res)
  //     window.reso = res
  //   })
  //   .catch(err => console.log(err))
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
