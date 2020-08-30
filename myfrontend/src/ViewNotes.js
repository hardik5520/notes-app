import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import "./Auth";
import Update from './Updatenote';

class ViewNotes extends Component {
  constructor() {
    super();
    this.state = {
      flag:false,
      id:"",
      Notes: [],
      login:false,
      viewdisplay:false
    };
  }
  componentDidMount=(props)=>{
    this.setState({id:this.props.id, login:this.props.login});
  }

  viewnotesbyid = (props) => {
    //console.log(this.props.id);
    this.setState({id:this.props.id, login:this.props.login,flag:this.props.flag});
    //console.log("stateis==",this.props.flag);
    //console.log(`./api/note/${this.state.id}`);
    axios
  .get(`/api/note/${this.state.id}`)
  .then((response) => {
    const Notes=response.data.note;
    this.setState({ Notes});
    //console.log(this.state.Notes);
  })
  .catch((err) => {
    console.log(err);
  });
}
handleDelete = (_id) => {
    axios.delete(`/api/note/${_id} `);
    //console.log("Note Deleted ", { _id });
    window.location.href="/view";
  };


  render() {
    const setviewdisplay =() => {
      this.setState({viewdisplay:!this.state.viewdisplay});
  }
    return (

      <React.Fragment>
        
        <button onClick={() => {this.viewnotesbyid(); setviewdisplay();}} id="ip3">VIEW</button>
        {this.state.viewdisplay?
        <>
        {this.state.Notes.map((obj, idx) => (
          <div key={idx} className="cardwrapper">
            <div  className="card2">
            <h4>{`${obj.title}`}</h4><br/>
            <h5>{`${obj.descreption}`}</h5>
            <div>
             <button onClick={() => {
                 this.handleDelete(obj._id);
                   }} id="ip4">DELETE</button>
           </div>
           
           <div><Update id={obj._id} title={obj.title} descreption={obj.descreption} /></div>
         </div>
         </div>
       ))}
       </>:<></>
  }
    </React.Fragment>
    )
  }
}

  export default ViewNotes;