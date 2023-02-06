import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

export const handler = async (event) => {
  const s3Client = new S3Client({ region: "us-west-2" });
  const bucket = "syu-images";
  const s3Summary = {
    Bucket: bucket,
    Key: "summary.json",
  };

  // Get new file name from trigger
  console.log("Handler Event", JSON.stringify(event, undefined, " "));
  const imageUploaded = event.Records[0].s3.object.key;

  // GetObject {bucket}/summary.json
  let summaryJson;
  try {
    summaryJson = await s3Client.send(new GetObjectCommand(s3Summary));
  } catch (error) {
    console.warn("Error getting summary.json", error);
    summaryJson = "[]";
  }

  const summary = JSON.parse(summaryJson);

  // Append new file to summary
  summary.push(imageUploaded); // TODO use a better data model that has a full URL

  // PutObject JSON.stringify(summaryData) to {bucket}/summary.json
  const updatedSummaryJson = JSON.stringify(summary, undefined, " ");
  console.log("Updated Summary JSON", updatedSummaryJson);
  try {
    await s3Client.send(
      new PutObjectCommand({
        ...s3Summary,
        Body: updatedSummaryJson,
        ContentType: "application/json", // For JSON, always application/json
      })
    );
  } catch (error) {
    console.warn("Failed to put summary", error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Updated summary.json",
      summary,
    }),
  };
};
