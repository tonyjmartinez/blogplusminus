import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import withAppContext from "../../context/withAppContext";

const useStyles = makeStyles({
  post: {
    padding: "2em",
    marginTop: "1em",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%"
  }
});

const frontPage = props => {
  const classes = useStyles();
  console.log("frontpage", props);

  const posts = () => {
    if (!props.context.recentPosts.loading) {
      const posts = props.context.recentPosts.recentPosts;
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
      {posts()}
      <button onClick={props.context.fetchMorePosts}>Fetch More </button>
    </div>
  );
};

export default withAppContext(frontPage);
