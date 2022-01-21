import http from "http";
import path from "path";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import dotenv from 'dotenv';
import cors from 'cors';
import {default as logger} from "morgan";
import {default as rfs} from "rotating-file-stream";
import { default as DBG } from 'debug';
import swaggerDocument from "./swagger.js"
import db from "./models/index.js";
import router from "./routes.js";
import {basicErrorHandler, handle404, normalizePort, onError, onListening} from "./utils/utils.js";
import { approotdir } from "./approotdir.js";


// Global variables
const __dirname = approotdir;
const debug = DBG('server:debug');
const dbgerror = DBG('server:error');

// Documentation setup Definitions
const swaggerDefinition = {
    ...swaggerDocument
};
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes.js'],
};
const swaggerSpec = swaggerJSDoc(options);

dotenv.config();
db.sequelize.sync({}).then(() => {
    debug("Drop and re-sync db.")
}).catch((err) => {
    dbgerror(err);
})

// Initialize the express app object
export const app = express();

// Setting api Port
export const port = normalizePort(process.env.PORT || '8080');
app.set('port', port)

// Middlewares
app
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(logger(process.env.REQUEST_LOG_FORMAT || 'common',  {
        stream: process.env.REQUEST_LOG_FILE ?
            rfs.createStream(process.env.REQUEST_LOG_FILE, {
                size: '10M',     // rotate every 10 MegaBytes written
                interval: '1d',  // rotate daily
                compress: 'gzip',
                path: path.join(__dirname, 'logs')
            })
            : process.stdout
    }))

// API DOCUMENTATION //
app.use("/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
)

// API ROUTES //
app.use("/api/v1", router);


// Error handling
app
    .use(handle404)
    .use(basicErrorHandler)


export const server = http.createServer(app);
server.listen(port);

//  Server Event handling
server.on('error', onError);
server.on('listening', onListening);
