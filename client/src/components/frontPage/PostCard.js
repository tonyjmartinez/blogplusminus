import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/styles";
import moment from "moment";
import withAppContext from "../../context/withAppContext.js";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles({
  card: {
    minWidth: 350
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const postCard = props => {
  const classes = useStyles();
  const theme = useTheme();
  console.log(theme);
  const { title, username, content, dateTime, id } = props.post;
  let user = username;

  const darkMode = props.context.darkMode;

  const cardColor = darkMode ? null : theme.palette.paper.main;

  console.log(cardColor);
  const style = {
    background: cardColor
  };

  if (!username) {
    user = "user";
  }

  console.log(title, content, dateTime);
  console.log(props);

  let dt = "";
  if (dateTime) {
    dt = moment(dateTime.toString()).fromNow();
  }

  return (
    <Card style={style}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {user}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {dt}
        </Typography>
        <Typography component="p">{content}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Open</Button>
      </CardActions>
    </Card>
  );
};

export default withAppContext(postCard);
