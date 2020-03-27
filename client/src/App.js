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
import ViewRecommendations from "./components/Common/ViewRecommendations";
import ChangePassword from "./components/Common/ChangePassword";

export var TestContext = React.createContext();
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  };
  }

   

  
  render() {

    
    return (
      <div>
           
        <ButtonAppBar style={{position:"relative",zIndex:10}} />
        
        <Router>
          <React.Fragment>
            <Route
              exact
              path="/studentSignup"
              render={() => (
                <>
                  {sessionStorage.getItem("token") === "" ||
                  sessionStorage.getItem("token") === null ? (
                    <TestContext.Provider
                      value={{
                        foo: "test"
                      }}
                    >
                      <SignUp />
                    </TestContext.Provider>
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />

            <Route
              exact
              path="/doctorSignup"
              render={() => (
                <>
                  {sessionStorage.getItem("token") === "" ||
                  sessionStorage.getItem("token") === null ? (
                    <TestContext.Provider
                      value={{
                        foo: "test"
                      }}
                    >
                      <DocSignUp />
                    </TestContext.Provider>
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/universitySignup"
              render={() => (
                <>
                  {sessionStorage.getItem("token") === "" ||
                  sessionStorage.getItem("token") === null ? (
                    <TestContext.Provider
                      value={{
                        foo: "test"
                      }}
                    >
                      <UniSignup />
                    </TestContext.Provider>
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <>
                  {sessionStorage.getItem("token") === "" ||
                  sessionStorage.getItem("token") === null ? (
                    <TestContext.Provider
                      value={{
                        foo: "test",
                        
                      }}
                    >
                      <LoginPage />
                    </TestContext.Provider>
                  ) : (
                    (document.location.href = "/")
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
                  {(sessionStorage.getItem("token") !== "" ||
                    sessionStorage.getItem("token") !== null) &&
                  sessionStorage.getItem("auth") === "Professor" ? (
                    <>
                       <TestContext.Provider
                      value={{
                     
                    
                      }}
                    >
                      <CreateRecommendation />
                      </TestContext.Provider>
                    </>
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />
            <Route
              exact
              path="/viewRecommendations"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" ||
                  sessionStorage.getItem("token") !== null ? (
                    <>
                      <ViewRecommendations style={{position:"relative",zIndex:1}} />
                    </>
                  ) : (
                    (document.location.href = "/")
                  )}
                </>
              )}
            />

<Route
              exact
              path="/changePassword"
              render={() => (
                <>
                  {sessionStorage.getItem("token") !== "" ||
                  sessionStorage.getItem("token") !== null ? (
                    <>
                      <ChangePassword />
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
