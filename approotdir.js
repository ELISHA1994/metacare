import * as path from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const approotdir = __dirname;



// return Promise.all(characterPromises)
//     .then(responses => responses.map(response => response.data))
//     .then(characters => {
//         const metaDataValues = metaDataFn(characters)
//
//         // Validate query params "gender"
//         if (gender === undefined) {
//             // SORTING all characters of a specific movie
//             if (sortName === undefined && sortHeight === undefined && sortGender === undefined) {
//                 return res.status(200).json({
//                     status: 200,
//                     message: `Characters  list fetch successfully`,
//                     body: {
//                         movie: movieTitle,
//                         metaData: metaDataValues,
//                         characters: characters
//                     }
//                 })
//             }
//
//             // SORTING all characters of a specific movie by Name
//             if (sortName !== undefined && sortHeight === undefined && sortGender === undefined) {
//
//             }
//         }
//     })