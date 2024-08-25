module.exports = async () => {
  const Tweet = require("./models/Tweet");
  const User = require("./models/User");

  User.hasMany(Tweet, { as: "Tweets", foreignKey: "userId" });
  Tweet.belongsTo(User, { as: "User", foreignKey: "userId" });

  const errHandler = (err) => {
    console.error("Error : ", err.message);
  };

  const user = await User.create({
    username: "Tanvi",
    password: "123456",
  }).catch(errHandler);

  if (user) {
    const tweet = await Tweet.create({
      content: "I am learning React and idk what is happening!1",
      userId: user.id,
    }).catch(errHandler);

    //Array for having the associations with the tweet in this case
    const users = await User.findAll({
      where: { username: "Subud" },
      include: [{ model: Tweet, as: "Tweets" }],
    }).catch(errHandler);

    console.log("Subuds Tweets : ", users);
  }
  else
    console.log("No user founded re baba")
};
