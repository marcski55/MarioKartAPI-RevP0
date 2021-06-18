const {DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand} = require ("@aws-sdk/client-dynamodb");
const AWS_ACCESS_KEY_ID="AKIA5773HFDMZICERVNO"
const AWS_SECRET_ACCESS_KEY="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"
const REGION = "us-east-2";
const ddb = new DynamoDBClient({region: REGION});
// export{ddb};

const TABLE_NAME = "KartData";

const getKartByName = async (name) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: {N: "0"},
            name: {S: "Standard Kart"},
        },
        // ProjectionExpression: "name",
    };
    console.log( await ddb.send(new GetItemCommand(params)) );
};
getKartByName();