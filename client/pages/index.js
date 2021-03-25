import axios from "axios";
// hooks only work inside React components

const LandingPage = ({ currentuser }) => {
  return <h1>This is Landing Page!</h1>;
};

// Runs on the server before rendering
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // We on server
    // URL can be shortend by using external service name in k8s
    const { data } = await axios.get(
      "http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // We on browser
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
};

export default LandingPage;
