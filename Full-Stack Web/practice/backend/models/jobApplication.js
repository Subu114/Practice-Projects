const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require("../config/database");
const JobPosting = require("./jobPosting");
const User = require("./user");


const JobApplication = sequelize.define("JobApplication", {

  application_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  job_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: JobPosting,
      key: "job_id",
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },
  application_status: {
    type: DataTypes.ENUM(
      "applied",
      "reviewed",
      "interview",
      "offered",
      "rejected"
    ),
    defaultValue : "applied",
    allowNull: false,
  }
});

module.exports = JobApplication;