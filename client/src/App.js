import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import DocSignUp from "./components/pages/DocSignUp"
import UniSignup from "./components/pages/UniversitySignUp"
import ButtonAppBar from "./components/Surfaces/ButtonAppBar";
import LoginPage from "./components/pages/LoginPage"

export var TestContext = React.createContext();
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ButtonAppBar />
        <Router>
          <React.Fragment>
            <Route
              exact
              path="/studentSignup"
              render={() => (
                <TestContext.Provider
                  value={{
                    foo: "test"
                  }}
                >
                  <SignUp />
                </TestContext.Provider>
              )}
            />

            <Route
              exact
              path="/doctorSignup"
              render={() => (
                <TestContext.Provider
                  value={{
                    foo: "test"
                  }}
                >
                  <DocSignUp />
                </TestContext.Provider>
              )}
            />
              <Route
              exact
              path="/universitySignup"
              render={() => (
                <TestContext.Provider
                  value={{
                    foo: "test"
                  }}
                >
                  <UniSignup />
                </TestContext.Provider>
              )}
            />
   <Route
              exact
              path="/login"
              render={() => (
                <TestContext.Provider
                  value={{
                    foo: "test"
                  }}
                >
                  <LoginPage />
                </TestContext.Provider>
              )}
            />

          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
