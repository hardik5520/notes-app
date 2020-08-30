import React, { Component } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Nav from './Nav';
import ViewNotes from './ViewNotes';
import Create from './Create';
import Logout from './Logout';
export default class nav extends Component{

    
    render(){
        return(
            <div>
                <BrowserRouter>
                <Nav />
                <Switch>
                    {/* <Route exact path='/' component={Login} /> */}
                    <Route exact path='/view'><ViewNotes id={this.props.id} login={this.props.login} /></ Route>
                    <Route exact path='/create'><Create  id={this.props.id} creatorname={this.props.creatorname}/></Route>
                    <Route exact path='/logout'><Logout /></Route>
                </Switch>
                </BrowserRouter>

            </div>
            );
    }


};

