const Aws = require('aws-sdk');


exports.storeInS3 = (fileName, fileData) => {
    try {
        const s3 = new Aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
        });
    
        const options  = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: fileData,
            ContentType: 'image/jpeg',
            ACL: 'public-read',
        }
    
        return new Promise((resolve, reject) => {
            s3.upload(options, (error, response) => {
                if(response) resolve(response.Location);
                if(error) console.log(error);
                reject({message : 'Error uploading on s3'});
            });
        });
    } catch (error) {
        throw error;
    }
}