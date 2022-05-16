

const singleImgUploader = ( fileName, pathName ) => {

    return function ( req, res, next ) {
    
        let finalFileName;

        if (req.files) {

            //get files
            const bgImgFile = req.files.fileName;
            const UploadedFilName = bgImgFile.name;

            const fileExt = path.extname(UploadedFilName);
            const fileNameWithoutExt =
                UploadedFilName
                .replace(fileExt, "")
                .toLowerCase()
                .split(" ")
                .join("-") +
            "-" +
            Date.now();

            finalFileName = fileNameWithoutExt + fileExt;

            // const uploadPath = `${__dirname}/../public/uploads/homepageimg/${finalFileName}`;
            const uploadPath = `${__dirname}/${pathName}/${finalFileName}`;

            bgImgFile.mv( uploadPath , (err) => {
                if (err) {
                    new Error('File Not Uploaded')
                }else{
                    next();
                }
            })

        }

        return finalFileName;
    }
}

// const singleImgUploader = (fileName, pathName ) => {
    
//       let finalFileName;

//       if (req.files) {

//         //get files
//         const bgImgFile = req.files.fileName;
//         const UploadedFilName = bgImgFile.name;

//         const fileExt = path.extname(UploadedFilName);
//         const fileNameWithoutExt =
//             UploadedFilName
//             .replace(fileExt, "")
//             .toLowerCase()
//             .split(" ")
//             .join("-") +
//           "-" +
//           Date.now();

//         finalFileName = fileNameWithoutExt + fileExt;

//         // const uploadPath = `${__dirname}/../public/uploads/homepageimg/${finalFileName}`;
//         const uploadPath = `${__dirname}/${pathName}/${finalFileName}`;

//         bgImgFile.mv( uploadPath , (err) => {
//           if (err) {
//             new Error('File Not Uploaded')
//           }
//         })

//     }

//     return finalFileName;
// }

module.exports = singleImgUploader;