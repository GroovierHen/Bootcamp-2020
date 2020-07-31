import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import data from "../data";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    margin: "0 auto",
  },
});

function LaunchShoe() {
  const classes = useStyles();
  const { slug } = useParams();
  const shoe = data[slug];

  if (!shoe) {
    return <h2>Not Found!</h2>;
  }

  const { name, img } = shoe;

  return (
    <Card className={classes.root}>
      <CardMedia component="img" alt="Product Image" image={img} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default LaunchShoe;
