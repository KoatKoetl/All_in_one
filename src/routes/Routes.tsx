import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ToDoApp from "../pages/ToDoApp";

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/todo" element={<ToDoApp />} />
    </Routes>
  );
};

export default RoutesComponent;
