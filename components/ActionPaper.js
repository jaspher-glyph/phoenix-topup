import React from "react";
import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  withStyles,
} from "@material-ui/core";

const styles = (theme) => ({
  helpPadding: {
    "@media (max-width:  400px)": {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
});

function ActionPaper(props) {
  const {
    alignTitle = "center",
    theme,
    classes,
    title,
    titleVariant = "h4",
    content,
    maxWidth,
    actions,
    helpPadding,
    fullWidthActions,
  } = props;
  return (
    <Box pt={1}>
      <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth] }}>
        {title && (
          <DialogTitle variant={titleVariant} align={alignTitle}>
            {title}
          </DialogTitle>
        )}
        {content && (
          <DialogContent
            classes={helpPadding ? { root: classes.helpPadding } : null}
          >
            {content}
          </DialogContent>
        )}
        {actions && (
          <Box pb={2} px={2}>
            <DialogActions
              classes={{ action: fullWidthActions ? classes.fullWidth : null }}
            >
              {actions}
            </DialogActions>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default withStyles(styles, { withTheme: true })(ActionPaper);
