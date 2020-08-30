import React, {Component} from 'react';
import axios from "axios";
// import Create from  "./Create";
// import View from "./ViewNotes";
import Signup from "./Auth";
import Home from './Home';

export default class Auth extends Component {
    constructor() {
      super();
      this.state = {
          id:"",
          name:"",
          login:false,
          stat:false,
          signupdisplay:false,
          logindisplay:true,
          email:"",
          password:"",
          //name:"",
          Users:[],
          Notes:[],
          viewdisplay:false,
          proceed:false,
          handleerror:false
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target=event.target;
        const name=target.name;
        const value=target.value;

        this.setState({
            [name]:value,
      })};

    async handleSubmit () {
        this.setState({login:false, handleerror:false, proceed:false})
        // console.log("status",this.state);
        let res=await axios.post("./api/user/login",this.state);
        console.log(res);
        if(res.data.message !== "error")
        {
            console.log("IN");
            this.setState({login:true, proceed:true});     
            this.setState({id:res.data.message, name:res.data.name});
            this.setState({stat:res.status});       
        }
        else{
            this.setState({proceed:false, handleerror:true, login:true})
        }
        //console.log("login is--",this.state.login);
        console.log("final state-",this.state);
    }


    render(){
        const setlogindisplay =() => {
            this.setState({logindisplay:!this.state.logindisplay});
        }
        
        if(this.state.login===false)
        {
            return(
            <React.Fragment>       
            <h6>Click here to Login!</h6>
            <button onClick={setlogindisplay} id="ip2">LOGIN</button>
            {this.state.logindisplay?
            <>
            <div className="card3">
            <form name="loggingin">
                Email:
              <input type="text" name="email" value={this.state.email} onChange={this.handleChange} id="ip1" /><br/><hr/>
              Password:
              <input type="text" name="password" value={this.state.password} onChange={this.handleChange} id="ip1" /><br/><hr/>
              </form>
              <div id="">Wrong credentials passed</div>
          <button color="danger" id="ip3" onClick={this.handleSubmit}>LOGIN</button>
            </div>
            </>:<></>
            }
        {
            <>
            <h6>New User?Click here to Signup!</h6><Signup />
            </>
        }
            </React.Fragment>
            )
        }
        // if(this.state.handleerror === true){
        //     return(
                
        //         <React.Fragment>
        //         <h6>Click here to Login!</h6>
        //         <button onClick={setlogindisplay} id="ip2">LOGIN</button>
        //         {this.state.logindisplay?
        //         <>
        //         <div className="card3">
        //         <form name="loggingin">
        //             Email:
        //           <input type="text" name="email" value={this.state.email} onChange={this.handleChange} id="ip1" /><br/><hr/>
        //           Password:
        //           <input type="text" name="password" value={this.state.password} onChange={this.handleChange} id="ip1" /><br/><hr/>
        //           </form>
        //           <div>wrong credentials passed</div>
        //       <button color="danger" id="ip3" onClick={this.handleSubmit}>LOGIN</button>
        //         </div>
        //         <div>wrong credentials passed</div>
        //         </>:<></>
        //         }
        //     {
        //         <>
        //         {/* // signuppart */}
        //         <h6>New User?Click here to Signup!</h6><Signup />
        //         </>
        //     }
        //         </React.Fragment>
        //         )
        // }
        if(this.state.proceed === true)
        {
            return(
                <Home id={this.state.id} login={this.state.login} creatorname={this.state.name} />
            );
        }
  }
    } 