import { Model } from "sequelize";

export default (sequelize, Datatype) => {
    class Comment extends Model {}
    Comment.init({
        description: {
            type: Datatype.STRING(500),
            allowNull: false
        },
        movieUrl: {
            type: Datatype.STRING,
            allowNull: false
        },
        IP_ADDRESS: Datatype.STRING
    }, {
        sequelize, modelName: "Comment"
    });
    return Comment;
}