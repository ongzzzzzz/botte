exports.isValidURL = (string) => {
  var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null)
};

exports.isValidIMG = (url) => {
  return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
};

exports.sleep = (delay) => {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
};

exports.prefix = './';