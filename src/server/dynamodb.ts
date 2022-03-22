import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const REGION = "REGION";

// Create an Amazon DynaomDB service client object.
export const dynamoClient = new DynamoDBClient({
  region: REGION,
});