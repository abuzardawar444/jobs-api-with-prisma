type User = {
  username: string;
  id: string;
};
export const createTokenUser = async (user: User) => {
  return { username: user.username, userId: user.id };
};
