import { Sequelize } from "sequelize"
import getProfileModel from "./getProfileModel"
import getExperienceModel from "./getExperienceModel"
import getEducationModel from "./getEducationModel";
import getCertificationModel from "./getCertificationModel";

const sequelize = new Sequelize(
    process.env.POSTGRESQL_DATABASE,
    process.env.POSTGRESQL_USER,
    process.env.POSTGRESQL_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.POSTGRESQL_HOST,
        dialectOptions: {
            ssl: true,
            sslmode: 'require'
        }
    }
)

const models = {
    Profile: getProfileModel(sequelize, Sequelize),
    Experience: getExperienceModel(sequelize, Sequelize),
    Education: getEducationModel(sequelize, Sequelize),
    Certification: getCertificationModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
    if('associate' in models[key]){
        models[key].associate(models);
    }
});

export { sequelize };

export default models;