module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_policy",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        unique: "user_policy_user_id_key",
      },
      ips: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: { ip: [], net: [] },
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      user_modules: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: { editor: [], viewer: [] },
      },
    },
    {
      sequelize,
      tableName: "user_policy",
      schema: "login",
      timestamps: false,
      indexes: [
        {
          name: "user_policy_user_id_key",
          unique: true,
          fields: [{ name: "user_id" }],
        },
        {
          name: "users_policy_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
