import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <RoutesComponent />
        <Footer />
      </Router>
    </>
  );
}

export default App;
