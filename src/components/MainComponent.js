import React, { Component } from "react";
import Header from "./header/Header";
import Home from "./Home/Home";
import Auth from "./Auth/Auth";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { auth, authCheck } from '../redux/authActionCreators';
import Logout from "./Auth/Logout";
import Hotels from "./Hotels/Hotels";

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}


class MainComponent extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.auth.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Route path="/hotels" component = {Hotels}/>
                    <Route path = "/" component={Home} />
                </Switch>
            )
        } else {
            routes = (
                <div>
                    <Switch>
                        <Route path="/hotels" component = {Hotels}/>  
                        <Route path="/logout" component={Logout} />
                        <Route path = "/" component={Home} />
                    </Switch>
                </div>
            )
        }

        return (
            <div>
                <div className="">
                    <Header />
                    {routes}
                </div>
            </div>
        )
    }
}

//export default MainComponent;

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);