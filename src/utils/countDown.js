export default function countDown(distanceToNow){
    if (distanceToNow <= 0) {
      return ({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      });
    } else {
      const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));
      const getHours = `0${Math.floor(
        (distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )}`.slice(-2);
      const getMinutes = `0${Math.floor(
        (distanceToNow % (1000 * 60 * 60)) / (1000 * 60)
      )}`.slice(-2);
      const getSeconds = `0${Math.floor(
        (distanceToNow % (1000 * 60)) / 1000
      )}`.slice(-2);

      return ({
        days: getDays || "00",
        hours: getHours || "00",
        minutes: getMinutes || "00",
        seconds: getSeconds || "00",
      });
    }
  }