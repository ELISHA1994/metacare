import constants from "../constants/index.js";
import {movieCharactersList, moviesList} from "../services/characters.service.js";

// ToDo: Add pagination functionalities

// Movies list endpoint controller
export const movies_list = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await moviesList();
    response.status = 200;
    response.message = constants.movieMessage.LIST_MOVIES;
    response.body = responseFromService;
    return res.status(response.status).json(response);
}

// character list endpoint  controller
export const moviecharacterslist = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await movieCharactersList(req.query);
    response.status = responseFromService.status;
    response.message = responseFromService.message;
    response.body = responseFromService.body;

    return res.status(response.status).json(response);

}
