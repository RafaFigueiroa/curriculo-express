import { DataTypes } from "sequelize";

const getEducationModel = (sequelize, {DataTypes}) => {
    const Education = sequelize.define('educations', {
        school: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        degree: {
            type: DataTypes.STRING,
        },
        course: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.STRING,
        },
        endDate: {
            type: DataTypes.STRING,
        },
    });

    Education.associate = (models) => {
        Education.belongsTo(models.Profile);
    };

    Education.findByPk = async (pk) => {
        let education = await Education.findOne({
            where: { id: pk },
        });

        return education;
    };

    return Education;
};

export default getEducationModel;