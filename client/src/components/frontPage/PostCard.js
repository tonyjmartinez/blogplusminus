import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

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
  const { title, username, content, dateTime, id } = props.post;
  let user = username;

  if (!username) {
    user = "user";
  }

  console.log(title, content, dateTime);

  let dt = "";
  if (dateTime) {
    dt = moment(dateTime.toString()).fromNow();
  }

  return (
    <Card className={classes.card}>
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

export default postCard;
