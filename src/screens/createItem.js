import React, { Component } from 'react';
import { Form, Modal, Button, Container,Card } from 'semantic-ui-react'
import Amplify, { Storage } from 'aws-amplify';
// import { Storage } from 'aws-amplify';
// const uuidv1 = require('uuid/v1');
// let apiName = 'ServerlessReactExampleCRUD';
// let path = '/ServerlessReactExample';

// class S3ImageUpload extends React.Component {
//   onChange(e) {
//       const file = e.target.files[0];
//       Storage.put('example.png', file, {
//           contentType: 'image/png'
//       })
//       .then (result => console.log(result))
//       .catch(err => console.log(err));
//   }
//
//   render() {
//       return (
//           <input
//               type="file" accept='image/png'
//               onChange={(e) => this.onChange(e)}
//           />
//       )
//   }
// }

class CreateItemModal extends Component {



  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.handleChangeName = this.handleChangeName.bind(this);
    // this.handleSubmitName = this.handleSubmitName.bind(this);

  }

  onChange(e) {
      const file = e.target.files[0];
      Storage.put('example.png', file, {
          contentType: 'image/png'
      })
      .then (result => console.log(result))
      .catch(err => console.log(err));
  }

  handleChange(event, {name, value}) {
    this.setState({ [name]: value });
  }

  handleSubmitName(event) {
    if (this.state.cardName.length > 7) {
      this.setState({ nameChosen: true, error: '' });
    } else {
      this.setState({ error: 'Name should be longer than 7' });
    }

  }
  handleSubmit(event) {
    if (this.state.cardName.length < 8) {
      this.setState({ error: 'Name should be longer than 7' });
      this.setState({ nameChosen: true, error: '' });
    } else {
      this.setState({ error: '' });

      // STORAGE.PUT LOGIC
    }
  }

  handleSubmiter(event) {
    console.log(this);
    Storage.get('welcome.png', { level: 'public' })
      .then(result => console.log('GOT IT', result))
      .catch(err => console.log('NO GO!', err))


    // let apiName = 'ServerlessReactExampleCRUD';
    // let path = '/ServerlessReactExample';
    // let newItem = {
    //   body: {
    //       "ID": uuidv1(),
    //       "ItemName": this.state.itemName,
    //       "ItemPrice": this.state.itemPrice,
    //       "ItemDescription": this.state.itemDescription
    //     }
    //   }
    // API.post(apiName, path, newItem).then(response => {
    // console.log(response)
    // }).catch(error => {
    //     console.log(error.response)
    // });
    // event.preventDefault();
    // this.props.getItems()
    // this.handleClose()
  }

  handleOpen = () => this.setState({ modalOpen: true, itemName: '', itemPrice: '', itemDescription: '' })

  handleClose = () => this.setState({ modalOpen: false })



  render () {
    return (
        <Modal trigger={<Button onClick={this.handleOpen}>+ Add Card</Button>} closeIcon={true} open={this.state.modalOpen} onClose={this.handleClose}>
          <Modal.Header>Add a Card</Modal.Header>
          <Modal.Content>

            <Form onSubmit={this.handleSubmit} >
            <Card.Header>
            {this.state.error}
            </Card.Header>
              <Form.Group unstackable widths={2}>
                <Form.Input name='cardName' label='Card Name' placeholder='Enter Card Name...' onChange={this.handleChange}  value={this.state.cardName} />
                <Form.Input name='cardTitle' label='Card Title' placeholder='Enter Card Title...' onChange={this.handleChange}  value={this.state.cardTitle} />
              </Form.Group>
              <Form.TextArea name='cardDescription' label='Card Description' placeholder='Add a Description of the Card...' onChange={this.handleChange}  value={this.state.cardDescription} />
              <Form.Button type='submit'>Submit</Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
      );
    }
  }

export default CreateItemModal;


/*
import React from 'react'
import { Form } from 'semantic-ui-react'

const FormExampleFieldDisabled = () => (
  <Form>
    <Form.Group widths='equal'>
      <Form.Input fluid label='First name' placeholder='Disabled' disabled />
      <Form.Input fluid label='Last name' placeholder='Disabled' disabled />
    </Form.Group>
  </Form>
)

export default FormExampleFieldDisabled
*/
