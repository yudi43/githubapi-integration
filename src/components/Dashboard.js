import React, { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import IssueList from "./IssueList";
import PullRequestList from "./PRList";
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';

const Dashboard = () => {
  const [issues, setIssues] = useState([]);
  const [pulls, setPulls] = useState([]);
  const initialLoadItems = 5;
  useEffect(() => {
    fetch(`https://api.github.com/repos/facebook/react/issues?page=1&per_page=${initialLoadItems}`)
      .then((res) => res.json())
      .then((data) => setIssues(data));

    fetch(`https://api.github.com/repos/facebook/react/pulls?page=1&per_page=${initialLoadItems}`)
      .then((res) => res.json())
      .then((data) => setPulls(data));
  }, []);

  return (
    <div>
      <Stack direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={12}>

        {/* Pull Requests Section */}
        <div style={{paddingTop:"100px"}}>
          <PullRequestList pulls={pulls} count={5} />
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <div />
            <Button component={Link} to="/pull-requests" color="primary" variant="contained">
                View All
            </Button>
          </Toolbar>
        </div>

        {/* Issues Section */}
        <div style={{paddingTop:"100px"}}>
          <IssueList issues={issues} count={5} />
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <div />
            <Button component={Link} to="/issues"  color="primary" variant="contained" >
                View All
            </Button>
          </Toolbar>
        </div>

      </Stack>
      </div>
  );
};

export default Dashboard;
