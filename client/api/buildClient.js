import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We on server
    // URL can be shortend by using external service name in k8s
    return axios.create({
      baseUrl: "http://ingress-nginx.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We on browser
    return axios.create({
      baseUrl: "/",
    });
  }
};
