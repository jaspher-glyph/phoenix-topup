import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Radio,
  Tabs,
  Tab,
  Typography,
  withStyles,
  withWidth,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setDenom } from "../../stores/actions";

const styles = (theme) => ({
  tab: {
    "& .MuiButtonBase-root": {
      flex: 1,
    },
  },
  item: {
    "&.MuiListItem-root": {
      "&:hover": {
        background: theme.palette.primary.light,
        color: "#fff",
        "& .MuiTypography-root": {
          color: "#fff",
        },
        "& .MuiBox-root": {
          borderColor: "#fff",
        },
      },
    },
  },
  active: {
    background: theme.palette.primary.main,
    color: "#fff",
    "& .MuiTypography-root": {
      color: "#fff",
    },
    "&:hover": {
      background: theme.palette.primary.light,
    },
  },
  denomContainer: {
    [theme.breakpoints.up("sm")]: {
      width: theme.breakpoints.values["sm"],
    },
  },
});

const defaultProps = {
  m: 2,
  border: 1,
  style: { width: "50px", height: "50px" },
};

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
      {value === index && <Box>{children}</Box>}
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

  return (
    <Box pb={1}>
      <Tabs
        className={classes.tab}
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
                  <ListItem
                    button
                    divider
                    key={"Item" + k}
                    className={`${classes.item} ${
                      denom == o.title ? classes.active : null
                    }`}
                    onClick={() => dispatch(setDenom(o.title))}
                  >
                    <ListItemText
                      primary={o.title}
                      secondary={o.description}
                      style={{ width: "80%" }}
                    />{" "}
                    <Box
                      display="flex"
                      borderRadius="50%"
                      {...defaultProps}
                      borderColor={denom == o.title ? "#fff" : "text.primary"}
                      justify="center"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography component="div">
                        <Box fontSize="h6.fontSize">{o.amount}</Box>
                        <Box fontSize={10} textAlign="center">
                          PHP
                        </Box>
                      </Typography>
                    </Box>
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

const denominations = {
  regular: [
    {
      title: "Regular Load 10",
      description: "Get 10 load amount",
      amount: "10",
    },
    {
      title: "Regular Load 30",
      description: "Get 30 load amount",
      amount: "30",
    },
    {
      title: "Regular Load 50",
      description: "Get 50 load amount",
      amount: "50",
    },
    {
      title: "Regular Load 100",
      description: "Get 100 load amount",
      amount: "100",
    },
  ],
  calltext: [
    {
      title: "Call and Text 10",
      description: "Get 10 load amount",
      amount: "10",
    },
    {
      title: "Call and Text 30",
      description: "Get 30 load amount",
      amount: "30",
    },
    {
      title: "Call and Text 50",
      description: "Get 50 load amount",
      amount: "50",
    },
    {
      title: "Call and Text 100",
      description: "Get 100 load amount",
      amount: "100",
    },
  ],
  data: [
    {
      title: "GIGASTUDY 99",
      description:
        "Enjoy 1 GB per day of Youtube, Google Meet, Google, etc. Valid for 7 days",
      amount: "99",
    },
    {
      title: "GIGAVIDEO 50",
      description:
        "Enjoy 1 GB of Youtube, IwantTV, Youtube Music, etc. and UNLITEXT to all networks. Valid for 3 days",
      amount: "50",
    },
    {
      title: "GIGAVIDEO+ 75",
      description:
        "Enjoy 1 GB of Video and UNLITEXT to all netwoEnjoy 1 GB of Youtube, IwantTV, Youtube Music, etc. and UNLITEXT to all networks + UNLICALL to Smart/TNT/Sun. Valid for 3 days",
      amount: "75",
    },
    {
      title: "GIGAVIDEO+ 100",
      description:
        "Enjoy 1 GB of Video and UNLITEXT to all netwoEnjoy 1 GB of Youtube, IwantTV, Youtube Music, etc. and UNLITEXT to all networks + UNLICALL to all networks. Valid for 3 days",
      amount: "100",
    },
  ],
};

export default withWidth()(withStyles(styles, { withTheme: true })(Denom));
