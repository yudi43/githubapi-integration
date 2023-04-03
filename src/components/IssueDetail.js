import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Link } from "@mui/material";

const IssueDetail = () => {
  const [issue, setIssue] = useState(null);
  const { issue_number } = useParams();
  const [comments, setComments] = useState([]);


  useEffect(() => {
    const fetchIssue = async () => {
      let fetchIssueUrl = `https://api.github.com/repos/facebook/react/issues/${issue_number}`;
      const { data } = await axios.get(`https://api.github.com/repos/facebook/react/issues/${issue_number}`);
      console.log('this was returned:', data);
      setIssue(data);
    };
    fetchIssue();
  }, [issue_number]);

  useEffect(() => {
    try {
      // Fetching 
      const fetchComments = async () => {
        let fetchCommentsUrl = `https://api.github.com/repos/facebook/react/issues/${issue_number}/comments`;
        const response = await fetch(fetchCommentsUrl);
        const commentsData = await response.json();
        if(commentsData.length > 5) {
          commentsData = commentsData.slice(0, 5);
        }
        setComments(commentsData);
      };
      fetchComments();
    } catch (error) {
      console.log('There was an error fetching the comments: ', error);
    }
  }, [issue_number]);

  if (!issue) {
    return null;
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    margin: theme.spacing(5),
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Item elevation="2">
          <div>
              <div style={{textAlign: 'left'}}>
                <Typography variant="subtitle2" >
                <strong>Issue number:</strong> <Typography variant="subtitle1">{issue_number}</Typography>
                </Typography>
                <Typography sx = {{mt: "30px"}} variant="subtitle2">
                <strong>Issue Title:</strong>  <Typography variant="subtitle1">{issue.title}</Typography>
                </Typography>
              
                <p>Total number of comments: <strong>{issue.comments}</strong></p>
              </div>
              {issue.comments > 0 ? (<div style={{backgroundColor: '#f2f2f2', border: "1px solid #f2f2f2", textAlign: 'left', paddingLeft: "20px"}}>
                <h3>Recent Comments:</h3>
                <ul>
                  {comments.map((comment) => <li>{comment.body}</li>)}
                </ul>
              </div>) : <p></p>}
              <Link href={issue.html_url} target="_blank">
                View on Github
              </Link>
          </div>          
        
      </Item>
    </div>
  );
};

export default IssueDetail;
