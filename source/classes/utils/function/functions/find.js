export default async function findUser(id, client, message, canAuthor = false) {
  let userID = String(id).replace("<@", "").replace(">", "");

  let user = client.users.cache.get(userID);

  if (!user) {
    try {
      user = await client.users.fetch(userID);
    } catch (e) {}
  }
  
  if (!user) {
    if (canAuthor) return message.author;
    else return false;
  } else return user;
}