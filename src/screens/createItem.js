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
      cardName:'',
      cardTitle:'',
      cardDescription:'',
      readyToUpload:false,
      cardLogoStatus:'',
      cardImageStatus:'',
      textColor:null,
      backgroundColor:null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.onChange = this.onChange.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
    // this.handleSubmitName = this.handleSubmitName.bind(this);

  }
  finalSubmit(event) {
    const {cardName,cardDescription,cardTitle,textColor,backgroundColor} = this.state
    // maker = {
    //
    // }
    console.log(this.state)
    console.log(textColor)
    console.log(backgroundColor)
  }

  onChange(e,{name, value}) {
    // window.steve = e
    console.log(name)
    console.log(value)
    if (name === 'cardImage') {
      var fileName = this.state.cardName+'/image.png'
      var file = file = e.target.files[0];
      console.log('about to store cardname')
      Storage.put(fileName, file, {
          contentType: 'image/png'
      })
      .then (result => {
        console.log(result)
        this.setState({ cardNameStatus: 'Uploaded Successfully!' });
      })
      .catch(err => {
        console.log(err)
        this.setState({ cardNameStatus: 'Error:',err });
      });
    }
    if (name === 'cardLogo') {
      var fileName = this.state.cardName+'/logo.png'
      var file = file = e.target.files[0];
      console.log('about to store cardlogo')
      Storage.put(fileName, file, {
          contentType: 'image/png'
      })
      .then (result => {
        console.log(result)
        this.setState({ cardLogoStatus: 'Uploaded Successfully!' });
      })
      .catch(err => {
        console.log(err)
        this.setState({ cardLogoStatus: 'Error:',err });
      });
    }

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
    } else {
      this.setState({ error: '', readyToUpload:true });
      // var maker = {
      //   "name": this.state.cardName,
      //   "date": Date.now(),
      //   "cardBackgroundColor":"rgb(51,55,56)",
      //   "cardTitleColor":"rgb(38,213,311)",
      //   "cardTitle":this.state.cardTitle,
      //   "cardDescription":this.state.cardDescription
      // }
      // this.setState({ maker: maker });
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

    const imageUploader = <Form onSubmit={this.finalSubmit}>
                                <Card.Header>
                                {this.state.cardNameStatus}
                                </Card.Header>
                              <Form.Input
                                  name='cardLogo' label='Card Logo' placeholder='Upload Card Logo...'
                                  type="file" accept='image/png'
                                  onChange={this.onChange}
                              />
                              <Card.Header>
                              {this.state.cardLogoStatus}
                              </Card.Header>

                              <Form.Input
                                  name='cardImage' label='Card Background Image' placeholder='Upload Card Image...'
                                  type="file" accept='image/png'
                                  onChange={this.onChange}
                              />

                              <Form.Input
                                  name='textColor' label='Card Text Color' placeholder='Choose text color...'
                                  type="color"
                                  onChange={this.handleChange}
                              />

                              <Form.Input
                                  name='backgroundColor' label='Card Background Color' placeholder='Choose background color...'
                                  type="color"
                                  onChange={this.handleChange}
                              />

                              <Form.Button type='submit'>Submit</Form.Button>
                          </Form>

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
              <Form.Button type='submit'>Next</Form.Button>
            </Form>
            {this.state.readyToUpload ? imageUploader : null}

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
