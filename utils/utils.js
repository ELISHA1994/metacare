import { port, server } from '../server.js';
import { default as DBG } from 'debug';
import axios from "axios";
const debug = DBG('server:debug');
const dbgerror = DBG('server:error');


export const fetchAllMovies = async () => {
    console.log("calling fetch")
    const response = await axios.get(process.env.BASE_URL);
    return response.data.results;
}

const cent_foot = (cm) => {
    const foot = 0.0328  * cm;
    return foot.toFixed(2);
}

const cent_inch = (cm) => {
    const inch = 0.3937 * cm;
    return inch.toFixed(2);
}

export const metaDataFn = (characters) => {
    const metaData = {};
    const heightInCm = characters.map(character => parseInt(character.height)).reduce((prev, curr) => prev + curr, 0);
    const height_inches = cent_inch(heightInCm);
    const height_foot = cent_foot(heightInCm);

    metaData["total_num_characters"] = characters.length;
    metaData["total_height_cm"] = heightInCm;
    metaData["total_height_foot"] = height_foot;
    metaData["total_height_inches"] = height_inches;

    return metaData;
}

// Try Catch higher other function (HOC)
export const use = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);


export function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val; }
    if (port >= 0) {
        return port;
    }
    return false;
}

export function onError(error) {
    dbgerror(error);
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

export function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug(`Listening on ${bind}`);
}

export function handle404(req, res) {
    res.status(404).json({ error: 'Not found' });
}

export function basicErrorHandler(err, req, res, next) {
    console.error("Error", err);
    res.status(500).json({
        status: 500,
        message: err.message,
        body:{}
    });
}
