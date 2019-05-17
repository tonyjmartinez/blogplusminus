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

  const [pagination, setPagination] = useState({
    page: 0,
    morePosts: true
  });

  console.log("pagination", pagination);

  const fetchMorePosts = async () => {
    console.log("fetch mroe posts)");
    if (props.data.loading) {
      return;
    }
    if (pagination.morePosts) {
      await props.data.fetchMore({
        variables: {
          skip: pagination.page + 10
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          console.log("inside update query", fetchMoreResult);
          if (!fetchMoreResult || fetchMoreResult.recentPosts.length === 0) {
            console.log("no more posts");
            setPagination({
              ...pagination,
              morePosts: false
            });
            return prev;
          }
          console.log();

          const newPosts = Object.assign({}, prev, {
            recentPosts: [...prev.recentPosts, ...fetchMoreResult.recentPosts]
          });

          setPagination({
            ...pagination,
            page: pagination.page + 5
          });
          return newPosts;
        }
      });
    }
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
        hasMore={pagination.morePosts}
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
