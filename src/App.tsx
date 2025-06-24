import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./routes/Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <div className="mx-auto max-w-[1440px]">
          <Header />
          <RoutesComponent />
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
