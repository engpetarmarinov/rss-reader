import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "../components/Home";
import Feeds from "../components/Feeds";
import Feed from "../components/Feed";
import NewFeed from "../components/NewFeed";

export default (
    <Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/feeds" element={<Feeds/>}/>
            <Route path="/feeds/:id" element={<Feed/>}/>
            <Route path="/feeds/new" element={<NewFeed/>}/>
        </Routes>
    </Router>
);
