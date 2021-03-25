// Global css goes here
import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/build-client";

const AppComponent = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

// context = { AppTree, Component, router, ctx: { req, res } }

// Because we added a getInitialProps in _app, we should invoke the
// getInitialProps of index file manually
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  // This piece of code invokes getInitialProps for each page we navigate to
  // this check prevents crashing if we navigate to a page with undefined getInitialProps
  // like signin, signup , ...
  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return data;
};

export default { AppComponent };
