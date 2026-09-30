import { Router } from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

export default router.post('/upload-image', async (req, res) => {
    try {
        const { imageData } = req.body;

        // Remove the data URL prefix
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');

        const imageFormat = getImageFormat(imageData);

        if (!imageFormat) {
            return res.status(400).json({ message: 'Invalid image format' });
        }

        const filename = `${uuidv4()}.${imageFormat}`;

        const imagePath = `uploads/${filename}`;
        fs.writeFileSync(imagePath, base64Data, 'base64');

        res.status(200).json({ message: 'Image uploaded successfully', imagePath: 'http://localhost:4000/'+imagePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

function getImageFormat(imageData) {
    if (imageData.startsWith('data:image/png')) {
        return 'png';
    } else if (imageData.startsWith('data:image/jpeg') || imageData.startsWith('data:image/jpg')) {
        return 'jpg';
    }
    return null;
}


// import { Router } from 'express';
// import fs from 'fs';
// import { v4 as uuidv4 } from 'uuid';

// const router = Router();

// export default router.post('/upload-image', async (req, res) => {
//     try {
//         const { imageData } = req.body;

//         const imageFormat = getImageFormat(imageData);

//         if (!imageFormat) {
//             return res.status(400).json({ message: 'Invalid image format' });
//         }

//         const filename = `${uuidv4()}.${imageFormat}`;

//         const imagePath = `uploads/${filename}`;
//         fs.writeFileSync(imagePath, imageData, 'base64');

//         res.status(200).json({ message: 'Image uploaded successfully', imagePath: imagePath });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

// function getImageFormat(imageData) {
//     if (imageData.startsWith('data:image/png')) {
//         return 'png';
//     } else if (imageData.startsWith('data:image/jpeg')) {
//         return 'jpeg';
//     } else if (imageData.startsWith('data:image/jpg')) {
//         return 'jpg';
//     }
//     return null;
// }
