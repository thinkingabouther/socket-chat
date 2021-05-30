const userConnectionRepository = require("../dbal/userConnectionRepository");
const userRepository = require("../dbal/userRepository");
const uuid = require("uuid").v1;

exports.addFriend = async (user, friendEmail) => {
  const friend = await userRepository.findByEmail(friendEmail);
  if (!friend) throw new Error("User with given email not found");

  const existingEdge = await userConnectionRepository.findConnection(
    user._id,
    friend._id
  );
  if (existingEdge) throw new Error("User is already in contact list");

  const id = uuid();
  await userConnectionRepository.addConnection(user._id, friend._id, id);
};

exports.findFriends = async (user) => {
  const friends = await userConnectionRepository.findFriends(user);
  if (friends.length === 0) return null;
  const friendsWithRooms = [];
  friends.forEach((friend) =>
    friendsWithRooms.push({
      name: friend.user.name,
      picture: friend.user.picture,
      roomID: friend.edge.roomID,
    })
  );
  return friendsWithRooms;
};
