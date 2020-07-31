import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NativeSelect, FormControl } from "@material-ui/core";

import { fetchCountries } from "../../api";

interface Props {
  handleCountryChange: (country: string) => void;
}

const useStyles = makeStyles({
  formControl: {
    marginTop: `3em`,
    marginBottom: "30px",
    width: "30%",
  },
});

const CountryPicker: React.FC<Props> = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountires] = useState<string[]>([]);

  const classes = useStyles();

  useEffect(() => {
    (async () => {
      setFetchedCountires(await fetchCountries());
    })();
  }, []);

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleCountryChange(e.target.value)
        }
      >
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => (
          <option key={i} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
