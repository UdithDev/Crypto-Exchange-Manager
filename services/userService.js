let users = []; // Simple in-memory user storage

const createUser = (user) => {
  users.push(user);
  return user;
};

const getUsers = () => {
  return users;
};

const updateUser = (userId, updatedUser) => {
  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    return users[index];
  }
  return null;
};

module.exports = { createUser, getUsers, updateUser };
