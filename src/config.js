const prod = {
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://dlmail3s7j.execute-api.us-east-2.amazonaws.com/prod/",
    },
};
const prod = {
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://rtnkme5phc.execute-api.us-east-2.amazonaws.com/prod",
    },
};
const config = {
    // Default to dev if not set
    ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};



export default config;