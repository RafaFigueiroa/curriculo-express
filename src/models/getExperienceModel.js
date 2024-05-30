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
        company: {
            type: DataTypes.STRING,
        },
        employmentType: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        modality: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.STRING,
        },
        endDate: {
            type: DataTypes.STRING,
        },
    });

    Experience.associate = (models) => {
        Experience.belongsTo(models.Profile);
    };

    Experience.findByPk = async (pk) => {
        let experience = await Experience.findOne({
            where: { id: pk },
        });

        return experience;
    }

    return Experience;
};

export default getExperienceModel;