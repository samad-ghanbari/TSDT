module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "personnels",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      ex_lastname: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      father_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      mother_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      birth_province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "provinces",
          key: "id",
        },
      },
      birth_city: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      birth_date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      natid: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      marital_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      religion: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      faith: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      working_province_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "provinces",
          key: "id",
        },
      },
      employed_date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      personnel_no: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      employee_no: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      employed_method: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      appearance: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      blood_type: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "personnels",
      schema: "base",
      timestamps: false,
      indexes: [
        {
          name: "personnels_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
