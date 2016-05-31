
import Firebase from 'firebase';

class TimeStamp {
  static now() {
    return Firebase.ServerValue.TIMESTAMP;
  }
}

module.exports = TimeStamp;
