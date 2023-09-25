import { Box, Paper, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExchangeTabPanel from "./ExchangeTabPanel";

const BottomTabsComponent = ({ pickedCountry, countryList, show = "0" }) => {
  const [tab, setTab] = useState(show);
  const navigate = useNavigate();
  const params = useParams().countryCode;

  const handleChange = (e, newValue) => {
    if (newValue === "2") {
      navigate(`/${params}/airports`);
    } else if (newValue === "1") {
      navigate(`/${params}`);
    }
    setTab(newValue);
  };

  return (
    <Box>
      <TabContext value={tab}>
        <Box sx={{ marginTop: 3, marginBottom: 3 }}>
          <TabList onChange={handleChange}>
            <Tab value={"0"} sx={{ display: "none" }}></Tab>
            <Tab label="CURRENCY EXCAHNGE" value={"1"} />
            <Tab label="AIRPORTS" value={"2"} />
          </TabList>
        </Box>
        <TabPanel value={"0"}></TabPanel>
        <TabPanel value={"1"} sx={{ padding: 0 }}>
          <ExchangeTabPanel
            pickedCountry={pickedCountry}
            countryList={countryList}
          />
        </TabPanel>
        <TabPanel value={"2"}>
          <Paper>xaeroport</Paper>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default BottomTabsComponent;
