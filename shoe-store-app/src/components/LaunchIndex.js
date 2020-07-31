import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import data from "../data";

function LaunchIndex() {
  return (
    <Grid container spacing={4}>
      {Object.entries(data).map(([slug, { name, img }]) => (
        <Grid item xs={12} sm={6} md={4} key={slug}>
          <Card>
            <CardMedia
              component="img"
              alt="Product Image"
              image={img}
              title={name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                component={RouterLink}
                to={`/launch/${slug}`}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default LaunchIndex;
