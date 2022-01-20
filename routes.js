import express from "express";
import { use } from "./utils/utils.js";
import {
    movies_list, moviecharacterslist
} from "./controllers/characters.controller.js";
import {
    post_comment, list_comments
} from "./controllers/comments.controller.js";

// Router variable
const router = express.Router();


// List all of Star Wars films details
router.get("/movies/list", use(movies_list));

// Search for movie characters => characters => sort "name" & "gender" OR "height"
// characters => filter "gender" => sort "name" & OR "height"
router.get("/movie/characters-list", use(moviecharacterslist));

// Add comment to a movie
router.post("/movie/post-comment", use(post_comment));
router.get("/movie/list-comment", use(list_comments));

export default router;