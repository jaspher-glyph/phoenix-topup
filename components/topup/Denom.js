import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Radio,
  Tabs,
  Tab,
  withStyles,
  withWidth,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setDenom } from "../../stores/actions";

const styles = (theme) => ({
  denomContainer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.breakpoints.values["sm"],
    },
  },
});

function TabPanel(props) {
  const { className, children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      className={className}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function Denom(prop) {
  const { classes } = prop;
  const dispatch = useDispatch();
  const denom = useSelector((state) => state.denom);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const denominations = {
    regular: [
      { title: "Regular Load 10", description: "Get 10 load amount" },
      { title: "Regular Load 30", description: "Get 30 load amount" },
      { title: "Regular Load 50", description: "Get 50 load amount" },
      { title: "Regular Load 100", description: "Get 100 load amount" },
    ],
    calltext: [
      { title: "Call and Text 10", description: "Get 10 load amount" },
      { title: "Call and Text 30", description: "Get 30 load amount" },
      { title: "Call and Text 50", description: "Get 50 load amount" },
      { title: "Call and Text 100", description: "Get 100 load amount" },
    ],
    data: [
      {
        title: "GIGASTUDY 99",
        description:
          "Enjoy 1 GB per day of Youtube, Google Meet, Google, etc. Valid for 7 days",
      },
      {
        title: "GIGAVIDEO 50",
        description:
          "Enjoy 1 GB of Youtube, IwantTV, Youtube Music, etc. and UNLITEXT to all networks. Valid for 3 days",
      },
      {
        title: "GIGAVIDEO+ 75",
        description:
          "Enjoy 1 GB of Video and UNLITEXT to all netwoEnjoy 1 GB of Youtube, IwantTV, Youtube Music, etc. and UNLITEXT to all networks + UNLICALL to Smart/TNT/Sun. Valid for 3 days",
      },
      {
        title: "GIGAVIDEO+ 100",
        description:
          "Enjoy 1 GB of Video and UNLITEXT to all netwoEnjoy 1 GB of Youtube, IwantTV, Youtube Music, etc. and UNLITEXT to all networks + UNLICALL to all networks. Valid for 3 days",
      },
    ],
  };

  return (
    <Box pb={1}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Regular Load" />
        <Tab label="Call&Text" />
        <Tab label="Data" />
      </Tabs>
      {map(denominations, (type, key, obj) => {
        return (
          <TabPanel
            value={value}
            index={Object.keys(obj).indexOf(key)}
            key={"TabPanel-" + key}
            className={classes.denomContainer}
          >
            <List>
              {map(type, (o, k) => {
                return (
                  <ListItem button divider key={"Item" + k}>
                    <ListItemText primary={o.title} secondary={o.description} />
                    <Radio
                      checked={denom === o.title}
                      onChange={() => dispatch(setDenom(o.title))}
                      value={o.title}
                    />
                  </ListItem>
                );
              })}
            </List>
          </TabPanel>
        );
      })}
    </Box>
  );
}

export default withWidth()(withStyles(styles, { withTheme: true })(Denom));
