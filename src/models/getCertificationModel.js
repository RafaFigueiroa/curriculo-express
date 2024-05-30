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
        issuingOrganization: {
            type: DataTypes.STRING,
        },
        issueDate: {
            type: DataTypes.STRING,
        },
    });

    Certification.associate = (models) => {
        Certification.belongsTo(models.Profile);
    }

    Certification.findByPk = async (pk) => {
        let certification = await Certification.findOne({
            where: { id: pk },
        });

        return certification;
    }

    return Certification;
}

export default getCertificationModel;