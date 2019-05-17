import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import withAppContext from "../../context/withAppContext";
import InfiniteScroll from "react-infinite-scroller";
import query from "../../queries/recentPosts";
import { graphql } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  post: {
    padding: "2em",
    marginTop: "1em",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%"
  },
  loader: {
    marginLeft: "0px auto",
    marginRight: "0px auto"
  }
});

//TODO: Better loading component, figure out how to know when hasMore is false
const frontPage = props => {
  const classes = useStyles();
  console.log("frontpage", props);

  const [page, setPage] = useState(0);

  const fetchMorePosts = async () => {
    if (props.data.loading) {
      return;
    }
    await props.data.fetchMore({
      variables: {
        skip: page + 10
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }
        console.log();
        return Object.assign({}, prev, {
          recentPosts: [...prev.recentPosts, ...fetchMoreResult.recentPosts]
        });
      }
    });
    setPage(page + 10);
  };

  const posts = () => {
    if (!props.data.loading) {
      const posts = props.data.recentPosts;
      return posts.map((post, idx) => (
        <Paper key={idx} className={classes.post} elevation={1}>
          <Typography variant="h5" component="h3">
            {post.title}
          </Typography>
          <Typography component="p">{post.content}</Typography>
        </Paper>
      ));
    } else {
      return null;
    }
  };

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMorePosts}
        hasMore={true}
        loader={
          <div className={classes.loader}>
            <CircularProgress className={classes.progress} color="secondary" />
          </div>
        }
      >
        {posts()}
      </InfiniteScroll>

      <button onClick={fetchMorePosts}>Fetch More </button>
    </div>
  );
};

export default graphql(query)(frontPage);
