chrome.commands.onCommand.addListener(function (command) {
  switch (command) {
    case 'save':
      Pinboard.save();
      break;
    case 'read_later':
      Pinboard.readLater();
      break;
    case 'saveTabs':
      Pinboard.saveTabs();
      break;
    case 'all':
      Pinboard.all();
      break;
    case 'unread':
      Pinboard.unread();
      break;
    case 'random':
      Pinboard.random();
      break;
    default:
      break;
  }
});
