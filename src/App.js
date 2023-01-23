import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Navigation from "../src/routes/navigation/Navigation";
import Home from "../src/routes/home/Home";
import Shop from "../src/routes/shop/Shop";
import Authentication from "../src/routes/authentication/Authentication";
import CheckOut from "../src/routes/checkOut/CheckOut";

const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
        <Route
          path="auth"
          element={
            currentUser ? <Navigate to="/" replace /> : <Authentication />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
