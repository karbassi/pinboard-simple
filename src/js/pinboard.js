var BASE_URL = 'https://pinboard.in';

var Pinboard = { // eslint-disable-line no-unused-vars
  all: function () {
    chrome.tabs.create({ url: BASE_URL });
  },
  random: function () {
    chrome.tabs.create({ url: BASE_URL + '/random/?type=unread' });
  },
  readLater: function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      var url = BASE_URL
        + '/add?later=yes&noui=yes&jump=close&url=' + encodeURIComponent(tab.url)
        + '&title=' + encodeURIComponent(tab.title);
      window.open(url, 'Pinboard', 'toolbar=no,scrollbars=no,width=50,height=50');
    });
  },
  save: function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var tab = tabs[0];
      chrome.tabs.executeScript(tab.id, {
        code: 'window.getSelection().toString();'
      }, function (selection) {
        var url = BASE_URL + '/add?showtags=yes&url=' + encodeURIComponent(tab.url)
          + '&title=' + encodeURIComponent(tab.title)
          + '&description=' + encodeURIComponent(selection);
        window.open(url, 'Pinboard', 'toolbar=no,scrollbars=no,width=700,height=550');
      });
    });
  },
  saveTabs: function () {
    chrome.windows.getAll({ populate: true, windowTypes: ['normal'] }, function (windows) {
      var list = [];
      var i = 0;
      var j = 0;
      var postData = new FormData();
      var request = new XMLHttpRequest();
      var tabs = null;
      var sublist = null;
      for (; i < windows.length; i += 1) {
        tabs = windows[i].tabs;
        sublist = [];
        for (j = 0; j < tabs.length; j += 1) {
          sublist.push({ title: tabs[j].title, url: tabs[j].url });
        }
        list.push(sublist);
      }
      postData.append('data', JSON.stringify({ browser: 'chrome', windows: list }));
      request.open('POST', BASE_URL + '/tabs/save/', true);
      request.onreadystatechange = function () {
        if (request.readyState === 4) {
          chrome.tabs.create({ url: BASE_URL + '/tabs/show/' });
        }
      };
      request.send(postData);
    });
  },
  unread: function () {
    chrome.tabs.create({ url: BASE_URL + '/toread/' });
  }
};
