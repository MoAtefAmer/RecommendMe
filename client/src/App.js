import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import ButtonAppBar from "./components/Surfaces/ButtonAppBar"


export var TestContext=React.createContext() 
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    
    return (
      <div>
<ButtonAppBar/>
        <Router>
          <React.Fragment>
            <Route exact path="/studentSignup" render={() => <TestContext.Provider value={{
              "foo":"test"
            }}><SignUp  /></TestContext.Provider>} />
          
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
