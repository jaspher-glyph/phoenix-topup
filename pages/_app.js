import { Fragment } from "react";
import PropTypes from "prop-types";
import { wrapper } from "../stores";
import MainLayout from "../components/layouts/MainLayout";

function App(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Fragment>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(App);
