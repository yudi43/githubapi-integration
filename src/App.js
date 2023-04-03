import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import PullRequestList from "./components/PRList";
import IssueList from "./components/IssueList";
import PullRequestDetail from "./components/PRDetail";
import IssueDetail from "./components/IssueDetail";
import Header from "./components/Header";

const App = () => {
  return (
    <div>
      <Router>
      <Header />
        <div>
          <Routes>
            <Route exact path="/" element={<Dashboard/>} />
            <Route exact path="/pull-requests" element={<PullRequestList/>} />
            <Route exact path="/pull-requests/:number" element={<PullRequestDetail/>} />
            <Route exact path="/issues" element={<IssueList/>} />
            <Route exact path="/issues/:issue_number" element={<IssueDetail/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
