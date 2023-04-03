import React, { useState, useEffect } from "react";
import CustomPagination from "./Pagination";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import {
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Link,
  Divider 
} from "@mui/material";

const IssueList = ({ count = 10 }) => {
  const [status, setStatus] = useState("open");
  const [sort, setSort] = useState("created");
  const [page, setPage] = useState(1);
  const [issues, setIssues] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchIssues = async () => {
      let issuesUrl = `https://api.github.com/repos/facebook/react/issues?state=${status}&sort=${sort}&page=${page}&per_page=${count}`;

      const response = await fetch(issuesUrl);
      const linkHeader = response.headers.get("Link");

      let finalHdr = linkHeader.split(',').filter((item) => item.includes("rel=\"last\""))[0];

      let finalPage = "";
      for (let i = finalHdr.indexOf("page=") + 5; i < finalHdr.length; i++) {
        if(finalHdr[i] == "&") break;
        finalPage += finalHdr[i]
      }

      setTotalPages(parseInt(finalPage))
      const data = await response.json();
      setIssues(data);
    };

    fetchIssues();
  }, [status, sort, page, count]);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const showPagination = count !== 5;

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    
    textAlign: 'center',
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
        <CardContent>
          <Typography variant="h5" component="h2">
            Issues
          </Typography>
          <FormControl sx = {{mt: 1.5, mr: 1.5}}>
            <Select size = "small" value={status} onChange={handleStatusChange}>
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx = {{mt: 1.5, mr: 1.5}}>
            <Select size = "small" value={sort} onChange={handleSortChange}>
              <MenuItem value="created">Created</MenuItem>
              <MenuItem value="updated">Updated</MenuItem>
              <MenuItem value="comments">Comments</MenuItem>
            </Select>
          </FormControl>
          <List sx={style} component="nav" aria-label="mailbox folders">
            {issues.map((issue) => (
                <div>
                <ListItem key={issue.id}>

                    <ListItemText
                    primary={
                      <Link href={"/issues/" + issue.number } > 
                        {issue.title}
                      </Link>
                    }
                    secondary={`#${issue.number} opened by ${issue.user.login}`}
                    />
                </ListItem>
               <Divider />

              </div>
            ))}
          </List>
          {showPagination && (
            <CustomPagination
              currentPage={page}
              totalPageCount={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Item>
    </div>
  );
};

export default IssueList;
