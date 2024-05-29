import { DataTypes } from "sequelize";

const getExperienceModel = (sequelize, {DataTypes}) => {
    const Experience = sequelize.define('experience', {
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    });

    Experience.associate = (models) => {
        Experience.belongsTo(models.Profile);
    };

    return Experience;
};

export default getExperienceModel;