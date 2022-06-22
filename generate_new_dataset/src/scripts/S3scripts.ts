import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY as string,
  secretAccessKey: process.env.S3_SECRET_KEY as string,
});

export const saveDataToS3 = async (data: string, filename: string) => {
  return new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.BUCKET_NAME as string,
        Key: `${filename}.json`,
        Body: data,
      },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data.Location);
      }
    );
  });
};

export const readDataFromS3 = async (filename: string) => {
  return new Promise((resolve, reject) => {
    s3.getObject(
      {
        Bucket: process.env.BUCKET_NAME as string,
        Key: `${filename}.json`,
      },
      (err, data) => {
        if (err) reject(err);
        resolve(data.Body?.toString("utf-8"));
      }
    );
  });
};
