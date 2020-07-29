import React from "react";
import {
    HashRouter,
    Switch,
    Route,
} from "react-router-dom";
import HomeContainer from "../containers/HomeContainer";

const appRoutes = (
    <Switch>
        <Route path="/" component={HomeContainer} />
    </Switch>

);

const AppRouter = () => <HashRouter>{appRoutes}</HashRouter>;

export default AppRouter;
