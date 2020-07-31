import React from "react";
import CountUp from "react-countup";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";

import { ApiResponse } from "../../api";

interface props {
  data: ApiResponse.RootObject;
}

const useStyles = makeStyles({
  root: {
    marginTop: "3em",
  },
  card: {
    margin: `0 2%`,
  },
  infected: {
    borderBottom: "10px solid rgba(0, 0, 255, 0.5)",
  },
  recovered: {
    borderBottom: "10px solid rgba(0, 255, 0, 0.5)",
  },
  deaths: {
    borderBottom: "10px solid rgba(255, 0, 0, 0.5)",
  },
  "@media (max-width: 770px)": {
    card: {
      margin: "2% 0",
    },
  },
});

const Cards: React.FC<props> = ({ data }) => {
  const classes = useStyles();

  if (!data) {
    return <div>Loading...</div>;
  }

  const { confirmed, recovered, deaths, lastUpdate } = data;

  return (
    <Grid container spacing={3} justify="center" className={classes.root}>
      <Grid
        item
        component={Card}
        xs={12}
        md={3}
        className={clsx(classes.card, classes.infected)}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Infected
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={confirmed.value}
              duration={2.5}
              separator=","
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2">
            Number of active cases of COVID-19
          </Typography>
        </CardContent>
      </Grid>
      <Grid
        item
        component={Card}
        xs={12}
        md={3}
        className={clsx(classes.card, classes.recovered)}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Recovered
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={recovered.value}
              duration={2.5}
              separator=","
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2">
            Number of recoveries from COVID-19
          </Typography>
        </CardContent>
      </Grid>
      <Grid
        item
        component={Card}
        xs={12}
        md={3}
        className={clsx(classes.card, classes.deaths)}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Deaths
          </Typography>
          <Typography variant="h5">
            <CountUp
              start={0}
              end={deaths.value}
              duration={2.5}
              separator=","
            />
          </Typography>
          <Typography color="textSecondary">
            {new Date(lastUpdate).toDateString()}
          </Typography>
          <Typography variant="body2">
            Number of deaths caused by COVID-19
          </Typography>
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default Cards;
