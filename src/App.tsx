import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Cars from "./components/Cars";
import SignIn from "./components/SignIn";
import { AuthProvider } from "./context/auth.context";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header>
          <Switch>
            <Route path="/login" component={SignIn} />
            <Route path="/" component={Cars} />
          </Switch>
        </Header>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
