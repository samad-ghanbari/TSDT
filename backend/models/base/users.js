const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nat_id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: "national_id_unique"
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    employee_code: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: "employee_code_unique"
    },
    deputy: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    offices: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    position: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    telephone: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    reset_password: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    last_login: {
      type: DataTypes.CHAR(1),
      allowNull: true
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'base',
    timestamps: false,
    indexes: [
      {
        name: "employee_code_unique",
        unique: true,
        fields: [
          { name: "employee_code" },
        ]
      },
      {
        name: "national_id_unique",
        unique: true,
        fields: [
          { name: "nat_id" },
        ]
      },
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
