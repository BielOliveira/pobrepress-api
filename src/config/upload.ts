import path from 'path';
import fs from 'fs';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');
export default {
  directory: tempFolder,

  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const filePath = path.join(tempFolder, file.originalname);
      const fileExists = fs.existsSync(filePath);
      if (fileExists) {
        let count = 1;
        let status = true;
        while (status) {
          const [name, extension] = file.originalname.split('.');
          const temporaryFileName = `${name}(${count}).${extension}`;
          count++;
          const fileStillExists = fs.existsSync(
            path.join(tempFolder, temporaryFileName),
          );
          if (!fileStillExists) {
            status = false;
            const definitiveFileName = temporaryFileName;
            const fileName = definitiveFileName;
            return callback(null, fileName);
          }
        }
      }
      const fileName = file.originalname;
      return callback(null, fileName);
    },
  }),
};
