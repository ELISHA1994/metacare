import constants from "../constants/index.js";
import requestIp from "request-ip";
import {createComment, listComment} from "../services/comments.service.js";

// Comments add Controller
export const post_comment = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    req.body.IP_ADDRESS = requestIp.getClientIp(req);
    console.log("ip address", req.body.IP_ADDRESS);
    const responseFromService = await createComment(req.body);
    response.status = 200;
    response.message = constants.commentMessage.COMMENT_CREATED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}

// Comments list endpoint Controller
export const list_comments = async (req, res) => {
    let response = { ...constants.defaultServerResponse };

    const responseFromService = await listComment(req.query);
    response.status = 200;
    response.message = constants.commentMessage.COMMENT_FETCHED;
    response.body = responseFromService;

    return res.status(response.status).json(response);
}