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
  Divider,
  Grid
} from "@mui/material";

const PullRequestList = ({ count = 10 }) => {
  const [status, setStatus] = useState("open");
  const [sort, setSort] = useState("popularity");
  const [pullRequests, setPullRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPullRequests = async () => {
      let prUrl = `https://api.github.com/repos/facebook/react/pulls?state=${status}&sort=${sort}&page=${page}&per_page=${count}`;

      const response = await fetch(prUrl);
      const linkHeader = response.headers.get("Link");

      let finalHdr = linkHeader.split(',').filter((item) => item.includes("rel=\"last\""))[0];
      
      let finalPage = "";
      for (let i = finalHdr.indexOf('page=') + 5; i < finalHdr.length; i++) {
        if(finalHdr[i] == "&") break;
        finalPage += finalHdr[i];
      }

      setTotalPages(parseInt(finalPage))
      const data = await response.json();
      setPullRequests(data);
    };

    fetchPullRequests();
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
            {/* Title */}
            <Typography variant="h5" component="h2">
              Pull Requests
            </Typography>

            {/* Filters */}
            <FormControl sx = {{mt: 1.5, mr: 1.5}}>
              <Select size="small" value={status} onChange={handleStatusChange}>
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="closed">Closed</MenuItem>
                <MenuItem value="merged">Merged</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx = {{mt: 1.5, mr: 1.5}}>
              <Select size="small" value={sort} onChange={handleSortChange}>
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="created">Created</MenuItem>
                <MenuItem value="updated">Updated</MenuItem>
              </Select>
            </FormControl>

          {/* Listview starts */}
          <List sx={style} component="nav" aria-label="mailbox folders">
            {pullRequests.map((pullRequest) => (
              <div>
                
                <ListItem key={pullRequest.id}>
                  <ListItemText
                    primary={
                      <Link href={"/pull-requests/" + pullRequest.number} > 
                        {pullRequest.title}
                      </Link>
                    }
                    secondary={`#${pullRequest.number} opened by ${pullRequest.user.login}`}
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

export default PullRequestList;
