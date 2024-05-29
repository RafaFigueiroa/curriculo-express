import { DataTypes } from "sequelize";

const getCertificationModel = (sequelize, {DataTypes}) => {
    const Certification = sequelize.define('certification', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            verification: {
                notEmpty: false
            },
        },
    });

    Certification.associate = (models) => {
        Certification.belongsTo(models.Profile);
    }

    return Certification;
}

export default getCertificationModel;