import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import withAppContext from "../../context/withAppContext";

const useStyles = makeStyles({
  root: {
    padding: "2em",
    marginTop: "1em"
  }
});

const frontPage = props => {
  const classes = useStyles();
  console.log("frontpage", props);

  const posts = () => {
    if (!props.context.recentPosts.loading) {
      const posts = props.context.recentPosts.recentPosts;
      //const title = posts[0].title;
      //const content = posts[0].content;
      return posts.map((post, idx) => (
        <Paper key={idx} className={classes.root} elevation={1}>
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

  return <div>{posts()}</div>;
};

export default withAppContext(frontPage);
