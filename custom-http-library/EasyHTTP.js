function EasyHTTP() {
    this.xhr = new XMLHttpRequest;
};

EasyHTTP.prototype.get = function (url, callback) {
    this.xhr.open("GET", url, true);
    this.xhr.send();

    const self = this;
    this.xhr.onload = function () {
        if (self.xhr.status === 200) {
            callback(null, self.xhr.responseText);
        } else {
            callback("ERROR STATUS: " + self.xhr.status);
        }
    }
};

EasyHTTP.prototype.post = function (url, data, callback) {
    this.xhr.open("POST", url, true);
    this.xhr.setRequestHeader("Content-type", "application/json");
    this.xhr.send(JSON.stringify(data));

    const self = this;
    this.xhr.onload = function () {
        callback(null, self.xhr.responseText);
    }
};

EasyHTTP.prototype.put = function (url, data, callback) {
    this.xhr.open("PUT", url, true);
    this.xhr.setRequestHeader("Content-type", "application/json");
    this.xhr.send(JSON.stringify(data));

    const self = this;
    this.xhr.onload = function () {
        callback(null, self.xhr.responseText);
    }
};

EasyHTTP.prototype.delete = function (url, callback) {
    this.xhr.open("DELETE", url, true);
    this.xhr.send();

    const self = this;
    this.xhr.onload = function () {
        if (self.xhr.status === 200) {
            callback(null, "SUCCESS: Post deleted");
        } else {
            callback("ERROR STATUS: " + self.xhr.status);
        }
    }
};