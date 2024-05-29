import { DataTypes } from "sequelize";

const getEducationModel = (sequelize, {DataTypes}) => {
    const Education = sequelize.define('education', {
        school: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validation: {
                notEmpty: false,
            },
        },
    });

    Education.associate = (models) => {
        Education.belongsTo(models.Profile);
    };

    return Education;
};

export default getEducationModel;