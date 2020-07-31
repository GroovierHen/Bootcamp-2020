import React, { useState, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";

import { Cards, Charts, CountryPicker } from "./components";
import { fetchData, ApiResponse } from "./api";
import covid19Image from "./images/covid_19_logo.png";
import { Root } from "./deckgl";

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse.RootObject>();
  const [country, setCountry] = useState("");

  const handleCountryChange = async (country: string) => {
    const fetchedData = await fetchData(country);
    setData(fetchedData);
    setCountry(country);
  };

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    })();
  }, []);

  return (
    <>
      <Container>
        <Grid container direction="column" alignItems="center">
          <img src={covid19Image} alt="Covid 19" className="covid_19_image" />
          <Cards data={data!} />
          <CountryPicker handleCountryChange={handleCountryChange} />
          <Charts data={data!} country={country} />
        </Grid>
      </Container>
      <div
        style={{
          position: "relative",
          height: "100vh",
        }}
      >
        <Root />
      </div>
    </>
  );
};

export default App;
