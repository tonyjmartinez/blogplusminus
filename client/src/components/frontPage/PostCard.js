import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";
import moment from "moment";
import withAppContext from "../../context/withAppContext.js";

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
  console.log(props.post);
  const { title, username, content, dateTime, id } = props.post;
  let user = username;

  const darkMode = props.context.darkMode;

  const cardColor = darkMode ? null : theme.palette.paper.main;

  const style = {
    background: cardColor
  };

  if (!username) {
    user = "user";
  }

  let dt = "";
  if (dateTime) {
    dt = moment(dateTime.toString()).fromNow();
  }

  const detailButton = () => {
    const link = `/post/${id}`;
    if (props.frontPage) {
      return (
        <CardActions>
          <Link to={link}>
            <Button variant="outlined" color="primary" size="small">
              Open
            </Button>
          </Link>
        </CardActions>
      );
    } else {
      return null;
    }
  };

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
      {detailButton()}
    </Card>
  );
};

export default withAppContext(postCard);
