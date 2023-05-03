import * as fs from 'fs';
import multer from 'multer';
import { join } from 'path';

export const upload = multer({
   storage: multer.diskStorage({
      destination: async (req, _, cb) => {
         const dirPath = join(__dirname, '../../public/files')
         // if the folder isn't in the project -> will create the folder
         if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true })
         }
         cb(null, dirPath)
      },
      filename: (_, file, cb) => {
         // removes spaces in the filename
         const formattedName = file.originalname.replace(/\s/g, "");
         // makes filename unique
         const fileName = `${Date.now()}-${formattedName}`

         cb(null, fileName)
      }
   })
})

