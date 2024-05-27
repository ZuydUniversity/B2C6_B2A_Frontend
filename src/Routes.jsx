import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { ResultOverview } from "./pages/ResultOverview";
import { PatientOverview } from "./pages/PatientOverview";
import { Home } from "./pages/Home";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Home/>
                </Route>
                <Route path="/ResultOverview">
                    <ResultOverview />
                </Route>
                <Route path="/PatientOverview">
                    <PatientOverview />
                </Route>
            </Switch>
        </Router>
    )
}