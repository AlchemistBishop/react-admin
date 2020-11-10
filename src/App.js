import React,{Fragment} from 'react';
import {BrowserRouter,Switch,Route} from  'react-router-dom';
import Login from './views/login/index'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render() {
    return (

        <BrowserRouter>
            <Switch>
                <Route exact component={Login} path="/"/>
            </Switch>
        </BrowserRouter>
);
}
}

export default App;
