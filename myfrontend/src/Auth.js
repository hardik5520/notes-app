import React, {Component} from 'react';
import axios from "axios";
// import create from  "./Create";
// import viewnotes from "./ViewNotes";


export default class Auth extends Component {
    constructor() {
      super();
      this.state = {
          signupdisplay:false,
          logindisplay:false,
          email:"",
          password:"",
          name:"",
          Users:[],
          check:false,
          exist:false,
          proceed:false
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }
    viewallusers = () => {
        axios
          .get("/api/user")
          .then((response) => {
            this.setState({ Users: response.data.users});
            console.log("hello",this.state.Users);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
    handleChange(event) {
        const target=event.target;
        const name=target.name;
        const value=target.value;

        this.setState({
            [name]:value,
      })};

      async handleSubmit ()  {
        this.setState({check:false, exist:false, procee:false});
        //console.log(this.state);
        let res=await axios.post('/api/user/signup',this.state);
        //console.log("res=",res.data.message);
        if(res.data.message!=="error")
        {
          this.setState({check:true, proceed:true})
        }
        else{
          this.setState({exist:true, proceed:false, check:true});
        }
        //console.log("check",this.state);    
    }
    proceed(){
      alert('SIGN UP SUCCESSFUL')
    }

    render(){
        const setsignupdisplay =() => {
            this.setState({signupdisplay:!this.state.signupdisplay});
        }
        if(this.state.check===false)
        {
          return(
            <React.Fragment>
                <div>
                {/* signuppart */}
              <button onClick={setsignupdisplay} id="ip2">SIGNUP</button>
              {this.state.signupdisplay?
              <>
              <div className="card3">
              <form name="signingup">
                Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange}  id="ip1"/><hr/>
                Email:<input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="ip1" /><hr/>
                Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="ip1" /><hr/>
                </form>
            <button color="danger" onClick={this.handleSubmit} id="ip3">SIGNUP</button>
              </div>
              </>:<></>
        }
        </div>
              </React.Fragment>)
        }
        if(this.state.exist===true)
        {
          return(
            <React.Fragment>
                <div>
                {/* signuppart */}
              <button onClick={setsignupdisplay} id="ip2">SIGNUP</button>
              {this.state.signupdisplay?
              <>
              <div className="card3">
              <form name="signingup">
                Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange}  id="ip1"/><hr/>
                Email:<input type="email" name="email" value={this.state.email} onChange={this.handleChange} id="ip1" /><hr/>
                Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange} id="ip1" /><hr/>
                </form>
                <div className="error">USER ALREADY EXISTS!</div>
            <button color="danger" onClick={this.handleSubmit} id="ip3">SIGNUP</button>
              </div>
              </>:<></>
        }
        </div>
              </React.Fragment>)
        }
        if(this.state.proceed === true)
        {
            return(
              <div>successfully registered, now Login!</div>
            );
        }
        }
}
          

