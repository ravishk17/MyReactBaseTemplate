import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../containers/Home/Home";

const Main = (props) => {
    return (
        <Routes>
            {/* Here we can add more different Routes pointing to different element, For e.g.
            <Route path="/profile" element={<Profile />} /> */}
            <Route path="/" element={<Home />} />
        </Routes>
    )
}
export default Main;
