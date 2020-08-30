import React, {Component} from 'react';
export default class Logout extends Component {
    
  
 async handleSubmit ()  {
     window.location.href="/";
  };
  
  render() { 
    return (
      <button onClick={this.handleSubmit} id="ip4">Logout</button>
    );
  }
}
