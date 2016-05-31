
class TimeStamp {
  static now() {
    var date = new Date();
    var helsenkiOffset = 2 * 60 * 60000;//maybe 3 [h*60*60000 = ms]
    var userOffset = date.getTimezoneOffset() * 60000; // [min*60000 = ms]
    return new Date(date.getTime() + helsenkiOffset + userOffset).getTime();
  }
}

module.exports = TimeStamp;
