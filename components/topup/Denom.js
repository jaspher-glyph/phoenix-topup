import { useState } from 'react'
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
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { map } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { setAmount, setDenom, setSku } from 'redux/order/actions'

const styles = (theme) => ({
  tab: {
    '& .MuiButtonBase-root': {
      flex: 1,
      '&:hover': {
        background: theme.palette.primary.light,
        color: '#fff',
      },
    },
  },
  item: {
    '&.MuiListItem-root': {
      '&:hover': {
        background: theme.palette.primary.light,
        color: '#fff',
        '& .MuiTypography-root': {
          color: '#fff',
        },
        '& .MuiBox-root': {
          borderColor: '#fff',
        },
      },
    },
  },
  active: {
    background: theme.palette.primary.main,
    color: '#fff',
    '& .MuiTypography-root': {
      color: '#fff',
    },
    '&:hover': {
      background: theme.palette.primary.light,
    },
  },
  denomContainer: {
    [theme.breakpoints.up('sm')]: {
      width: theme.breakpoints.values['sm'],
    },
  },
})

const defaultProps = {
  m: 2,
  border: 1,
  style: { width: '50px', height: '50px' },
}

function TabPanel(props) {
  const { className, children, value, index, ...other } = props
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
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function Denom(prop) {
  const { classes } = prop
  const dispatch = useDispatch()
  const denom = useSelector((state) => state.order.denom)
  const sku = useSelector((state) => state.order.sku)
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleDenom = ({ title, amount, sku }) => {
    dispatch(setDenom(title))
    dispatch(setAmount(amount))
    dispatch(setSku(sku))
  }

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
            key={'TabPanel-' + key}
            className={classes.denomContainer}
          >
            <List>
              {map(type, (o, k) => {
                return (
                  <ListItem
                    button
                    divider
                    key={'Item' + k}
                    className={`${classes.item} ${sku == o.sku ? classes.active : null}`}
                    onClick={() => handleDenom(o)}
                  >
                    <ListItemText
                      primary={o.title}
                      secondary={o.description}
                      style={{ width: '80%' }}
                    />{' '}
                    <Box
                      display="flex"
                      borderRadius="50%"
                      {...defaultProps}
                      borderColor={denom == o.title ? '#fff' : 'text.primary'}
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
                )
              })}
            </List>
          </TabPanel>
        )
      })}
    </Box>
  )
}

const denominations = {
  regular: [
    {
      sku: 'GLYSMART20',
      title: 'GLY-Smart Eload 20',
      description: '20 airtime load and valid for 30 days',
      amount: '20',
    },
    {
      sku: 'GLYSMART30',
      title: 'GLY-Smart Eload Economy (P30)',
      description: '30 airtime load and valid for 15 days',
      amount: '30',
    },
    {
      sku: 'GLYSMART60',
      title: 'GLY-Smart Eload Regular (P60)',
      description: '60 airitme load and valid for 30 days',
      amount: '60',
    },
    {
      sku: 'GLYSMART100',
      title: 'GLY-Smart Eload 100',
      description: '100 aitime load and valid for 30 days',
      amount: '100',
    },
  ],
  calltext: [
    {
      sku: 'GLYSMALLTXTPLUS20',
      title: 'GLY-Smart All Text Plus 20',
      description:
        'Unlitext to all network + 20 min calls to SMART/TNT/SUN + All day chat and Surf and valid for 1 day',
      amount: '20',
    },
    {
      sku: 'GLYSMAI25',
      title: 'GLY-Smart All-in 25',
      description:
        'Unlimited SMS to all network + 60mins call for Smart/TnT & Sun + 100MB valid for 1 day',
      amount: '25',
    },
    {
      sku: 'GLYSMBRO50',
      title: 'GLY-Smart BRO 50',
      description: 'Up to 150 minutes valid for 15 days',
      amount: '50',
    },
    {
      sku: 'GLYSMALLTXT50',
      title: 'GLY-Smart All Text 50',
      description: '300 Smart to Smart/TNT + 30 texts to all networks and valid for 3 days',
      amount: '50',
    },
  ],
  data: [
    // {
    //   sku: 'GLYSMBB10',
    //   title: 'GLY-Smart Big Bytes 10',
    //   description: '30MB mobile internet surfing + 250MB music streaming from Spinnr',
    //   amount: '10',
    // },
    {
      sku: 'GLYSMBROBB15',
      title: 'GLY-Smart BigBytes 15 (Buddy BRO)',
      description: '40 MB data with 300 MB for Spinnr for 2 days',
      amount: '15',
    },
    {
      sku: 'GLYSMBROBB30',
      title: 'GLY-BigBytes 30 (Bro)',
      description: '100MB + freebies 400MB Spinnr (music streaming) valid for 1 day',
      amount: '30',
    },
    {
      sku: 'GLYSMBROSURFMAX50',
      title: 'GLY-Smart BRO Surf Max 50',
      description: 'All day surfing valid for 1 day',
      amount: '50',
    },
    {
      sku: 'GLYSMGS99',
      title: 'GLY-Smart Giga Surf 99',
      description:
        '2GB data + 1GB/day of Video every day for Youtube/iFlix/iWant TV/NBA League Pass/Cignal TV valid for 7 days',
      amount: '99',
    },
  ],
}

export default withWidth()(withStyles(styles, { withTheme: true })(Denom))
