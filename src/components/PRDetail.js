import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography } from "@material-ui/core";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from "@mui/material";

const PullRequestDetail = () => {
  const { number } = useParams();
  const [pullRequest, setPullRequest] = useState(null);
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    // Fetch the pull request by ID and set the state
    const fetchPullRequest = async () => {
      let fetchUrl = `https://api.github.com/repos/facebook/react/pulls/` + number;
      let response = await fetch(fetchUrl);
      const data = await response.json();
      setPullRequest(data);
    };
    fetchPullRequest();
  }, [number]);

  useEffect(() => {
    try {
      // The assignment tells to fetch the "comments" and show them, assuming "commits" was wanted. 
      // Fetching commits
      const fetchCommits = async () => {
        let fetchCommitsUrl = `https://api.github.com/repos/facebook/react/pulls/${number}/commits`;
        const response = await fetch(fetchCommitsUrl);
        const commitsData = await response.json();
        if(commitsData.length > 5) {
          commitsData = commitsData.slice(0, 5);
        }
        setCommits(commitsData);
      };
      fetchCommits();
    } catch (error) {
      console.log('There was an error fetching the commits: ', error);
    }
  }, [number]);

  if (!pullRequest) {
    return <div>Loading...</div>;
  }
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    margin: theme.spacing(5),
    color: theme.palette.text.secondary,
  }));

  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  return (
    <div>
      <Item elevation="2">
        <div style={{textAlign: 'left'}}>
          <Typography variant="subtitle2" >
          <strong>PR number:</strong> <Typography variant="subtitle1">{number}</Typography>
          </Typography>
          <Typography sx = {{mt: "30px"}} variant="subtitle2">
          <strong>PR Title:</strong>  <Typography variant="subtitle1">{pullRequest.title}</Typography>
          </Typography>
         
          <p>Total number of commits: <strong>{pullRequest.commits}</strong></p>
        </div>
        <div style={{backgroundColor: '#f2f2f2', border: "1px solid #f2f2f2", textAlign: 'left', paddingLeft: "20px"}}>
          <h3>Recent commits:</h3>
          <ul>
            {commits.map((commit) => <li>{commit.commit.message}</li>)}
          </ul>
        </div>
        <Link href={pullRequest.html_url} target="_blank">
          View on Github
        </Link>
      </Item>
  </div>
  );
};

export default PullRequestDetail;
