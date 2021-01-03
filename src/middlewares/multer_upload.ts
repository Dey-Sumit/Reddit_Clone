import multer, { FileFilterCallback } from 'multer'
import { makeId } from '../utils/helpers'
import path from 'path'

// Multer is Express middleware.  Multer acts as a helper when uploading files. multi/form data
const upload = multer({
   storage: multer.diskStorage({
      destination: 'public/images',
      filename: (_, file: Express.Multer.File, callback) => {
         // rename the file
         const name = makeId(15)
         callback(null, name + path.extname(file.originalname)) // sfadsa.jpg
      },
   }),
   fileFilter: (_, file: Express.Multer.File, callback: FileFilterCallback) => {
      if (
         file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/jpeg' ||
         file.mimetype === 'image/png'
      ) {
         callback(null, true)
      } else {
         console.log(file.mimetype)

         console.error('not valid file')

         callback(new Error('not valid file'))
      }
   },
})

export default upload
