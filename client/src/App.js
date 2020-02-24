import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./components/pages/SignUp"

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  
    };
  
  }
  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Route exact path="/studentSignup" render={() => 
            <SignUp/>
            
            
            } />
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
