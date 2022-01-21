import express from "express";
import { use } from "./utils/utils.js";
import {
    movies_list,
    moviecharacterslist
} from "./controllers/characters.controller.js";
import {
    post_comment,
    list_comments
} from "./controllers/comments.controller.js";

// Router variable
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       required:
 *         - movie_name
 *         - opening_crawl
 *         - comment_counts
 *       properties:
 *         movie_name:
 *           type: string
 *           description: Movie title
 *         opening_crawl:
 *           type: string
 *           description: movie opening crawl
 *         comment_counts:
 *           type: integer
 *           description: comments count posted of the movie
 *       example:
 *         movie_name: A New Hope
 *         opening_crawl: It is a period of civil war. Rebel spaceships, striking\r\nfrom a hidden base, have won their first victory against the evil Galactic Empire.
 *         comment_counts: 4
 *     Character:
 *       type: object
 *       required:
 *         - name
 *         - height
 *         - mass
 *         - hair_color
 *         - skin_color
 *         - eye_color
 *         - birth_year
 *         - gender
 *       properties:
 *         name:
 *           type: string
 *           description: character name
 *         height:
 *           type: string
 *           description: character height
 *         mass:
 *           type: string
 *           description: character mass
 *         hair_color:
 *           type: string
 *           description: character hair_color
 *         skin_color:
 *           type: string
 *           description: character skin_color
 *         eye_color:
 *           type: string
 *           description: character eye_color
 *         birth_year:
 *           type: string
 *           description: character birth_year
 *         gender:
 *           type: string
 *           description: character gender
 *       example:
 *         name: Boba Fett
 *         height: "78"
 *         mass: "78.2"
 *         hair_color: "black"
 *         skin_color: "fair"
 *         eye_color: "brown"
 *         birth_year: "31.5BBY"
 *         gender: "male"
 *     Comment:
 *       type: object
 *       required:
 *         - description
 *         - movieUrl
 *       properties:
 *         description:
 *           type: string
 *           description: comment
 *         movieUrl:
 *           type: string
 *           description: url of movie
 *         IP_ADDRESS:
 *           type: string
 *           description: users public ip address
 *       example:
 *         id: 1
 *         description: i love how the movie gives hope
 *         movieUrl: https://swapi.py4e.com/api/films/1/
 *         IP_ADDRESS: "192.00."
 *
 */

/**
 * @swagger
 * tags:
 *   name: Movie
 *   description: Star Wars Films Api
 */

/**
 * @swagger
 * /api/v1/movies/list:
 *   get:
 *     summary: Retrieve a list of starwars movies
 *     tags: [Movie]
 *     description: Retrieve a list of starwars movies from https://swapi.py4e.com/api/films/. The movies list is sorted by release date from earliest to newest and each movie should be listed along with opening crawls and count of comments
 *     responses:
 *       200:
 *         description: A list of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Response status
 *                       example: 200
 *                     message:
 *                       type: string
 *                       description: Response message
 *                       example: MOVIES Fetched Successfully
 *                     body:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Movie'
 *
 */
router.get("/movies/list", use(movies_list));


/**
 * @swagger
 * /api/v1/movie/characters-list?title=TheEmpireStrikesBack:
 *   get:
 *     summary: Retrieve a list of characters in a movie.
 *     tags: [Movie]
 *     parameters:
 *       - in: query
 *         name: title
 *         type: string
 *         required: true
 *         description: title of the movie to search
 *       - in: query
 *         name: sortName
 *         type: string
 *         required: false
 *         description: sortName sort characters by name
 *       - in: query
 *         name: sortHeight
 *         type: string
 *         required: false
 *         description: sortHeight sort characters by height
 *       - in: query
 *         name: sortGender
 *         type: string
 *         required: false
 *         description: sortGender sort characters by gender
 *       - in: query
 *         name: gender
 *         type: string
 *         required: false
 *         description: gender filters characters by gender
 *     description: Retrieve's a list of characters and accept sort parameters to sort by one of name, gender or height in ascending or descending order. It also accepts a filter parameter to filter by gender.
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Response status
 *                       example: 200
 *                     message:
 *                       type: string
 *                       description: Response message
 *                       example: Characters list fetch successfully
 *                     body:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Character'
 *
 *       default:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: response status
 *                       example: 400
 *                     message:
 *                       type: string
 *                       description: response message
 *                       example: Bad request! Please input title query
 *                     body:
 *                       type: object
 *                       description: empty object
 *                       example: {}
 *
 */

// Search for movie characters => characters => sort "name" & "gender" OR "height"
// characters => filter "gender" => sort "name" & OR "height"
router.get("/movie/characters-list", use(moviecharacterslist));

/**
 * @swagger
 * /api/v1/movie/post-comment:
 *   post:
 *     summary: Post a comment for a movie
 *     tags: [Movie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Response status
 *                       example: 200
 *                     message:
 *                       type: string
 *                       description: Response message
 *                       example: COMMENT Created Successfully
 *                     body:
 *                       $ref: '#/components/schemas/Comment'
 *
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: response status
 *                       example: 500
 *                     message:
 *                       type: string
 *                       description: response message
 *                       example: Bad request! Please input title query
 *                     body:
 *                       type: object
 *                       description: empty object
 *                       example: {}
 *
 */

// Add comment to a movie
router.post("/movie/post-comment", use(post_comment));

/**
 * @swagger
 * /api/v1/movie/list-comment?movieUrl=https://swapi.py4e.com/api/films/1/:
 *   get:
 *     summary: Retrieve a list of characters in a movie.
 *     tags: [Movie]
 *     parameters:
 *       - in: query
 *         name: movieUrl
 *         type: string
 *         required: true
 *         description: url of the movie whose comments is been retrived
 *     description: Retrieve's a list of comments on a movie
 *     responses:
 *       200:
 *         description: Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: Response status
 *                       example: 200
 *                     message:
 *                       type: string
 *                       description: Response message
 *                       example: Characters list fetch successfully
 *                     body:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Character'
 *
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: response status
 *                       example: 500
 *                     message:
 *                       type: string
 *                       description: response message
 *                       example: Bad request!
 *                     body:
 *                       type: object
 *                       description: empty object
 *                       example: {}
 *
 */

router.get("/movie/list-comment", use(list_comments));

export default router;