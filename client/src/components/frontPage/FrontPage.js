import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import InfiniteScroll from "react-infinite-scroller";
import query from "../../queries/recentPosts";
import { graphql } from "react-apollo";
import CircularProgress from "@material-ui/core/CircularProgress";
import PostCard from "./PostCard";
import withAppContext from "../../context/withAppContext.js";

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
    marginRight: "0px auto",
    marginTop: "1em"
  },
  circle: {
    margin: "0px auto",
    width: "10%",
    paddingTop: "10px"
  }
});

const frontPage = props => {
  const classes = useStyles();

  const [pagination, setPagination] = useState({
    page: 0,
    morePosts: true
  });

  const fetchMorePosts = async () => {
    if (props.data.loading) {
      return;
    }
    if (pagination.morePosts) {
      await props.data.fetchMore({
        variables: {
          skip: pagination.page + 10
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult || fetchMoreResult.recentPosts.length === 0) {
            setPagination({
              ...pagination,
              morePosts: false
            });
            return prev;
          }

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

  const Posts = props => {
    //  if (!props.data.loading && props.data.recentPosts !== undefined) {
    const posts = props.data.recentPosts;
    const postCards = posts.map((post, idx) => {
      return (
        <div key={idx} className={classes.loader}>
          <PostCard darkMode={props.context.darkMode} frontPage post={post} />
        </div>
      );
    });
    return postCards;
  };

  return (
    <div>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMorePosts}
        hasMore={pagination.morePosts}
        loader={
          <div key={1} className={classes.circle}>
            <CircularProgress className={classes.progress} color="secondary" />
          </div>
        }
      >
        {props.data.recentPosts !== undefined ? (
          <Posts {...props} />
        ) : (
          <div>Loading...</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default graphql(query)(withAppContext(frontPage));
