import buildClient from "../api/buildClient";
// hooks only work inside React components

const LandingPage = ({ currentuser }) => {
  return currentuser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// Runs on the server before rendering
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
