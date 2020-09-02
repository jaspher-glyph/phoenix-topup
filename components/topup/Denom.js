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
      sku: 'GLYSMUCT30',
      title: 'GLY-Smart Enhanced UCT 30',
      description: '100MB Data w/ Unli Trinet calls + Unli All Net SMS for 1 Day',
      amount: '30',
    },
    {
      sku: 'GLYSMUCT50',
      title: 'GLY-Smart Enhanced UCT 50',
      description: 'Unli Trinet Calls + UNLI AllNet SMS + 50MB internet valid for 3 days',
      amount: '50',
    },
    {
      sku: 'GLYSMUCT100',
      title: 'GLY-Smart UCT 100',
      description:
        'UNLI calls & texts to Smart/TNT + 80 texts to All Net & Free 30MB for chat & surf valid for 4 days',
      amount: '100',
    },
  ],
  data: [
    {
      sku: 'GLYSMALLOUTSURF20',
      title: 'GLY-All Out Surf 20',
      description:
        '150MB Data + Unlimited Facebook Unlimited texts to all networks 20 Min calls to Smart & TNT and Sun',
      amount: '20',
    },
    {
      sku: 'GLYSMSURFMAXPLS50',
      title: 'GLY-Smart Surf Max Plus 50',
      description: '4G/LTE all day surfing valid for 1 day',
      amount: '50',
    },
    {
      sku: 'GLYSMBROGIGASURFS50',
      title: 'GLY-Smart Bro Giga Surf eLoad 50',
      description:
        '1GB + 1GB EVERY DAY for YouTube/iflix/NBA/Cignal & iWant + UNLITEXT to ALL for 3 days',
      amount: '50',
    },
    {
      sku: 'GLYSMBROSURFMAX85',
      title: 'GLY-Smart BRO Surf Max 85',
      description: 'All day surfing valid for 2 days',
      amount: '85',
    },
  ],
}

export default withWidth()(withStyles(styles, { withTheme: true })(Denom))
