import buildClient from "../api/buildClient";
// hooks only work inside React components

const LandingPage = ({ currentuser }) => {
  return <h1>This is Landing Page!</h1>;
};

// Runs on the server before rendering
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default LandingPage;
