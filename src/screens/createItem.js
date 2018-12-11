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
      textColor:'#ffffff',
      backgroundColor:'#0000ff',
      finalSubmitStatus:'',
      done:false,
      cardImageSubmitted:false,
      cardLogoSubmitted:false
    }

    this.baseState = this.state


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.onChange = this.onChange.bind(this);
    this.finalSubmit = this.finalSubmit.bind(this);
    // this.handleSubmitName = this.handleSubmitName.bind(this);

  }
  finalSubmit(event) {
    const {cardName,cardDescription,cardTitle,textColor,backgroundColor} = this.state
    const maker = {
      cardName:cardName,
      cardDescription:cardDescription,
      cardTitle:cardTitle,
      textColor:textColor,
      backgroundColor:backgroundColor
    }
    console.log(maker)



    var fileName = this.state.cardName+'/meta.json'
    Storage.put(fileName, JSON.stringify(maker))
      .then (result => {
        console.log(result)

        Storage.put('card_names/'+this.state.cardName,'')
          .then(res => {
            console.log(res)
            console.log(result)
            // this.setState({ cardSubmitSuccess: 'Uploaded Successfully!',done:true });
            this.setState({ finalSubmitStatus: 'Uploaded Successfully!',readyToUpload:false,done:true });
            // window.reso = res
          })
          .catch(err => {
            console.log(err)
            this.setState({ cardSubmitSuccess: 'Error:',err });
          })
      })
      .catch(err => {
        console.log(err)
        this.setState({ finalSubmitStatus: 'Error:',err });
      });
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
        this.setState({ cardImageStatus: 'Uploaded Successfully!' });
        this.setState({ cardImageSubmitted: true });
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
          this.setState({ cardLogoSubmitted: true });
      })
      .catch(err => {
        console.log(err)
        this.setState({ cardSubmitSuccess: 'Error:',err });
      });
    }
  }

  handleChange(event, {name, value}) {
    this.setState({ [name]: value });
  }

  // handleSubmitName(event) {
  //   if (this.state.cardName.length > 7) {
  //     this.setState({ nameChosen: true, error: '' });
  //   } else {
  //     this.setState({ error: 'Name should be longer than 7' });
  //   }
  //
  // }
  handleSubmit(event) {
    var cardNamer = this.state.cardName
    if (cardNamer.length < 8) {
      this.setState({ error: 'Name should be longer than 7' });
    } else {
      console.log('checking card_names')
      console.log(cardNamer)
      Storage.list('card_names/'+cardNamer)
      .then(res => {
        if (res.length > 0) {
          console.log(res)
          var nameTaken = false
          res.forEach(function(d) {
            if (d.key === 'card_names/'+cardNamer) {
              var nameTaken = true
            }
          })
          if (nameTaken) { this.setState({ error: 'name already taken'}) }
          else {this.setState({ error: '', readyToUpload:true })}
        } else {
          console.log(res)
          this.setState({ error: '', readyToUpload:true });
        }
      })
      .catch(err => {
        console.log(err)
        // this.setState({ error: err});
      })
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

  handleClose = () => {
    this.setState({ modalOpen: false })
    this.setState(this.baseState)
  }


  render () {

    const imageUploader = <Form onSubmit={this.finalSubmit}>
                                <Card.Header>
                                {this.state.cardImageStatus}
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
          {this.state.done ?
            <Card.Header>
              {this.state.finalSubmitStatus}
            </Card.Header> :

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
              <Card.Header>
                {this.state.finalSubmitStatus}
              </Card.Header>
            </Form>
            }
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
