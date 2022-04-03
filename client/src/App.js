import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/layout/Dashboard";
import "antd/dist/antd.css";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
// import { route } from '../../routes/api/user';

function App() {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <Router>
          <Route exact path="/" component={Landing} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
