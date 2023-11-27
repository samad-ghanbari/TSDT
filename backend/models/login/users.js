module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      personnel_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "personnels",
          key: "id",
        },
        unique: "users_personnel_id_key",
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      reset: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      last_login: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "login",
      timestamps: false,
      indexes: [
        {
          name: "users_personnel_id_key",
          unique: true,
          fields: [{ name: "personnel_id" }],
        },
        {
          name: "users_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
