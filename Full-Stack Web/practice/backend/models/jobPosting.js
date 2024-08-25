const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const User = require("../models/user")

const JobPosting = sequelize.define("JobPosting", {
  job_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  employer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  job_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary_range: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  job_type: {
    type: DataTypes.ENUM(
      "full-time",
      "part-time",
      "contract",
      "temporary",
      "internship"
    ),
    allowNull: false,
  }
});

module.exports = JobPosting;
