
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import axios from 'axios';
import Orders from './pages/Orders';
import PrivateRoute from './components/PrivateRoute';
import Admin from './pages/Admin';

axios.defaults.baseURL = "https://pizzaz-api.onrender.com";


function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
      />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" exact ><Redirect to="/" /></Route>

          <Route path="/cart" exact component={Cart} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <PrivateRoute path="/orders" exact component={Orders} />
          <PrivateRoute path="/admin" component={Admin} />

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
