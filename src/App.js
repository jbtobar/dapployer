import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Label, Form, Input, Search, Sidebar, Segment, Button, Menu, Image, Icon, Header, Grid, Message } from 'semantic-ui-react'
import ItemDashboard from './screens/itemDashboard'
import 'semantic-ui-css/semantic.css'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(aws_exports);
// import 'semantic-ui-css/semantic.css'
// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import Amplify, { API } from 'aws-amplify';
// import aws_exports from './aws-exports';

// import CreateItemModal from './screens/createItem'
// import { withAuthenticator } from 'aws-amplify-react'




class App extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    return (
      <Segment>
        <Menu>
           <Menu.Item name='home'> <Icon name="shop"/></Menu.Item>
           <Menu.Item name='Items'/>
           <Menu.Item name='aboutUs' />
         </Menu>
         <ItemDashboard />
      </Segment>

    );
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>
//             Edit <code>src/App.js</code> and save to reload.
//           </p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
export default withAuthenticator(App, true);
