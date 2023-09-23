//Renders a Grid item as information type and information

import { Grid, Typography } from "@mui/material";
import { generateCountriesArr } from "../utils/generateNeighbourCountriesText";

const CountryData = ({ infoType, info }) => {
  let conditionalNeighboursText;
  if (typeof info === "object") {
    conditionalNeighboursText = generateCountriesArr(info);
  }

  return (
    <Grid item xs={12} md={6}>
      <Grid container>
        <Grid item sx={{ paddingLeft: 1, paddingTop: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {infoType}:
          </Typography>
        </Grid>
        <Grid item sx={{ paddingLeft: 1, paddingTop: 1 }}>
          <Typography variant="body2">
            {conditionalNeighboursText ? conditionalNeighboursText : info}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CountryData;
