import { useState } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DataProvider from "./utils/DataProvider.jsx";
import Home from "./components/Home.jsx";
import PostCreate from "./components/PostCreate.jsx";
import PostDetailView from "./components/PostDetailView.jsx";
import PostUpdate from "./components/PostUpdate.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Login from "./components/AccountLogin.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Header from "./components/Header.jsx";

const App = () => {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Header isAuthenticated={isAuthenticated} />
          <Routes>
            {/* Public routes */}
            <Route
              path="/account"
              element={<Login isUserAuthenticated={isUserAuthenticated} />}
            />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />

            {/* Private routes */}
            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<PostCreate />} />
              <Route path="/details/:id" element={<PostDetailView />} />
              <Route path="/update/:id" element={<PostUpdate />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
