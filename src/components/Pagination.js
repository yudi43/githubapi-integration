import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomPagination = ({ currentPage, totalPageCount, onPageChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Pagination
        page={currentPage}
        count={Math.ceil(totalPageCount / 10)}
        onChange={onPageChange}
      />
    </div>
  );
};

export default CustomPagination;
