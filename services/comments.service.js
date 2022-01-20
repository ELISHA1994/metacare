import db from "../models/index.js";

const Comment = db.Comment;
// const Op = db.Sequelize.Op;

export const createComment = async (data) => {
    const comment = await Comment.create(data);
    return comment;
}

export const listComment = async ({ movieUrl }) => {
    const comments = await Comment.findAll({
        where: { movieUrl: movieUrl },
        order: [["createdAt", "DESC"]],
        attributes: {exclude: ["id", "movieUrl", "updatedAt"]}
    });

    return comments;
}