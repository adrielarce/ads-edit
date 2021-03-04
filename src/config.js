const dev = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-2",
        BUCKET: "dev-ads-infrastructure-s3-uploads4f6eb0fd-sy95fswi6wi2",
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://3oo9ovne12.execute-api.us-east-2.amazonaws.com/dev",
    },
    cognito: {
        REGION: "us-east-2",
        IDENTITY_POOL_ID: "us-east-2:204c093a-a327-49cd-9024-3adccbe6a411",
    },
};
const prod = {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-2",
        BUCKET: "dev-ads-infrastructure-s3-uploads4f6eb0fd-sy95fswi6wi2",
    },
    apiGateway: {
        REGION: "us-east-2",
        URL: "https://rtnkme5phc.execute-api.us-east-2.amazonaws.com/prod",
    },
    cognito: {
        REGION: "us-east-2",
        IDENTITY_POOL_ID: "us-east-2:204c093a-a327-49cd-9024-3adccbe6a411",
    },
};
const config = {
    // Default to dev if not set
    ...(process.env.REACT_APP_STAGE === "prod" ? prod : dev),
};



export default config;