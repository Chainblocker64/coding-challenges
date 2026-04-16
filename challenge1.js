function activityStatus(users) {
  let status = {
    online: [],
    offline: [],
    away: [],
  };

  users.forEach((user) => {
    const username = user.username;

    if (
      username === null ||
      typeof username !== "string" ||
      username.length <= 0
    ) {
      return;
    }

    switch (user.status) {
      case "offline":
        status.offline.push(username);
        break;
      case "online":
        if (user.lastActivity > 10) {
          status.online.push(username);
        }
    }
  });
}
