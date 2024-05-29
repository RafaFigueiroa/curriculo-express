import { DataTypes } from "sequelize";

const getProfileModel = (sequelize, {DataTypes}) => {
    const Profile = sequelize.define('profile', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        title: {
            type: DataTypes.STRING,
        },
        about: {
            type: DataTypes.TEXT,
        },
        number: {
            type: DataTypes.STRING,
        },
        location: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        github: {
            type: DataTypes.STRING,
        },
        linkedin: {
            type: DataTypes.STRING,
        },
    });

    Profile.associate = (models) => {
        Profile.hasMany(models.Experience, { onDelete: 'CASCADE' });
        Profile.hasMany(models.Education, { onDelete: 'CASCADE' });
        Profile.hasMany(models.Certification, { onDelete: 'CASCADE' });
    };

    Profile.findByLogin = async (login) => {
        let profile = await Profile.findOne({
            where: { name: login },
        });

        if(!profile) {
            profile = await Profile.findOne({
                where: { email: login },
            });
        }

        return profile;
    }

    Profile.findByPk = async (pk) => {
        let profile = await Profile.findOne({
            where: { id: pk },
        });

        if(!profile) {
            profile = await Profile.findOne({
                where: { email: login },
            });
        }

        return profile;
    }

    return Profile;
};

export default getProfileModel;