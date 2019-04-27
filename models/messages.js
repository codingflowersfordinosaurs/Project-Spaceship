"use strict";
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define(
    "messages",
    {
      author: DataTypes.STRING,
      body: DataTypes.STRING
    },
    {}
  );
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};
