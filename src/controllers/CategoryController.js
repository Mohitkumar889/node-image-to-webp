const helpers = require("../util/helpers.js");
const sharp = require('sharp');
const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: 'AKIA6KBVSYF6PRESTB6X',
    secretAccessKey: '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',
});

const s3 = new AWS.S3();

module.exports = () => {
    
    const convertImage = async(req, res, next) => {
        console.log("CategoryController => convertImage");
        const webpBuffer = await sharp(req.file.path).webp().toBuffer();
        const newFileName = `${Date.now()}_${req.file.originalname.replace(/\.[^/.]+$/, '')}.webp`;
        const params = {
            Bucket: 'bookyour-gift-media',
            Key: newFileName,
            Body: webpBuffer,
            ContentType: 'image/webp',
            ACL: 'public-read',
          };
          await s3.upload(params).promise();
        const fileURL = `https://bookyour-gift-media.s3.amazonaws.com/${newFileName}`;
        if(fileURL){
            req.msg = "image uploaded";
            req.rData = {fileURL};
        }else{
            req.rCode = 0;
            req.msg = "image not uploaded";
            req.rData = {};
        }
        
        next();
    };

    return {
        convertImage
    };
};