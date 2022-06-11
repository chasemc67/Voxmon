import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Mint from './Mint';
import MyVoxmon from './MyVoxmon';
// import { Home } from './content/Home';
import Landing from './Landing';
import SingleView from './SingleView';
import Voting from './Voting';
import MyVotes from './MyVotes/MyVotes';
import SignIn from './SignIn';
import Profile from './Profile';
console.log(process.env.REACT_APP_ENABLE_MINT)
const Routes =  () => {
    const {isLoggedIn} = useAuth();
    return (
        <>
            <Switch>
                <Route path="/mint">
                    <Mint />
                </Route>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/home" component={Landing}/>
                <Route exact path="/voxmon/:id">
                    <SingleView/>
                </Route>
                <ConditionalRoute exact path="/signin" condition={!isLoggedIn} redirect="/" component={SignIn} />
                <Route exact path="/voting" component={Voting}/>
                <ConditionalRoute exact path="/profile" condition={isLoggedIn} redirect="/" component={Profile} />
                <Route exact path="/myvotes" component={MyVotes}/>
                <Route exact path="/mint" component={Mint}/>
                <Route exact path="/9776290409" component={MyVoxmon}/>
                <Route path="/">
                    {/* show page not found */}
                </Route>
            </Switch>
        </>
    )
}

const ConditionalRoute = ({ component: Component, redirect='/', condition, ...rest }) => (
    <Route {...rest} render={(props) => (
        condition
            ? <Component {...props} />
            : <Redirect to={redirect} />
    )} />
)

export default Routes;