function activityStatus(users) {
  let status = {};

  users.forEach((user) => {
    const username = user.username;

    switch (user.status) {
      case "offline":
        status.offline = status.offline || [];
        status.offline.push(username);
        break;
      case "online":
        if (user.lastActivity > 10) {
          status.away = status.away || [];
          status.away.push(username);
        } else {
          status.online = status.online || [];
          status.online.push(username);
        }
    }
  });

  return status;
}
