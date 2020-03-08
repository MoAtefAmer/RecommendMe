import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import DocSignUp from "./components/pages/DocSignUp";
import UniSignup from "./components/pages/UniversitySignUp";
import ButtonAppBar from "./components/Surfaces/ButtonAppBar";
import LoginPage from "./components/pages/LoginPage";
import RequestRecommendation from "./components/pages/Student/RequestRecommendation";
import CreateRecommendation from "./components/pages/Professor/CreateRecommendation";

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
                <>
                  {sessionStorage.getItem("token") !== "" ? (
                    (document.location.href = "/")
                  ) : (
                    <TestContext.Provider
                      value={{
                        foo: "test"
                      }}
                    >
                      <SignUp />
                    </TestContext.Provider>
                  )}
                </>
              )}
            />

            <Route
              exact
              path="/doctorSignup"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" ? (
                    (document.location.href = "/")
                  ) : (
                    <TestContext.Provider
                      value={{
                        foo: "test"
                      }}
                    >
                      <DocSignUp />
                    </TestContext.Provider>
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/universitySignup"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" ? (
                    (document.location.href = "/")
                  ) : (
                    <TestContext.Provider
                      value={{
                        foo: "test"
                      }}
                    >
                      <UniSignup />
                    </TestContext.Provider>
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" ? (
                    (document.location.href = "/")
                  ) : (
                    <TestContext.Provider
                      value={{
                        foo: "test"
                      }}
                    >
                      <LoginPage />
                    </TestContext.Provider>
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/requestRecommendation"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" &&
                  sessionStorage.getItem("auth") === "Student" ? (
                    <>
                      <RequestRecommendation />
                    </>
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/createRecommendation"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" &&
                  sessionStorage.getItem("auth") === "Professor" ? (
                    <>
                      <CreateRecommendation />
                    </>
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
