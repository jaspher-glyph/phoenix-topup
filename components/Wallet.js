import cx from 'clsx'
import { withStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained'
import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise'
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded'

const useStyles = (theme) => ({
  card: {
    marginTop: 40,

    borderRadius: theme.spacing(0.5),
    transition: '0.3s',
    overflow: 'initial',
    background: '#ffffff',
  },
  cardHeader: {
    textAlign: 'center',
  },
  content: {
    paddingTop: 0,
    paddingBottom: '0 !important',
    textAlign: 'left',
    overflowX: 'auto',
  },
})

const Wallet = ({ wallet, classes, children, maxWidth, theme, helpPadding }) => {
  const cardHeaderStyles = useContainedCardHeaderStyles()
  const cardShadowStyles = useSoftRiseShadowStyles({ inactive: true })
  const cardHeaderShadowStyles = useFadedShadowStyles()
  return (
    <Card
      className={cx(classes.card, cardShadowStyles.root)}
      style={{ maxWidth: theme.breakpoints.values[maxWidth] }}
    >
      <CardHeader
        className={(cardHeaderShadowStyles.root, classes.cardHeader)}
        classes={cardHeaderStyles}
        title={`PHP ${wallet || 0.0}`}
        subheader="Available Balance"
      />
      <CardContent className={classes.content}>
        <Box pt={3} px={3}>
          {children}
        </Box>
      </CardContent>
    </Card>
  )
}

export default withStyles(useStyles, { withTheme: true })(Wallet)
