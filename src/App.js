import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import ProductListing from "./components/Product/ProductListing";
import "./App.css";
import Cart from "./components/Cart/Cart";
import SignIn from "./components/Auth/SignIn";
import UserListing from "./components/User/UserListing";
import UserDetails from "./components/User/UserDetails";
import Header from "./components/Header/Header";
import ProductDetails from "./components/Product/ProductDetails";
import UserForm from "./components/User/UserForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/user" exact component={UserListing} />
          <Route path="/Products" exact component={ProductListing} />
          <Route path="/user/:userId" component={UserDetails} />
          <Route path="/user/add" component={UserForm} />
          <Route path="/product/:productId" component={ProductDetails} />
          <Route path="/cart" component={Cart} />
          <Route>404 Not Found!</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
