// Using the gdate algorithm: https://alcor.concordia.ca/~gpkatch/gdate-algorithm.html
const gdate = (y, m, d) => {
  m = (m + 9) % 12
  y = y - parseInt(m/10)
  return 365 * y + parseInt(y / 4) - parseInt(y / 100) + parseInt(y / 400) + parseInt((m * 306 + 5) / 10) + (d - 1);      
}

// Sets the range and returns a function that compares the pre-set range with the input number. If it is in range, returns the number, otherwise, -1.
const inRange = (x, y) => (num) => (parseInt(num) >= x && parseInt(num) <= y);

const yearInRange = inRange(1901, 2999);
const monthInRange = inRange(1, 12);
const dayInRange = inRange(1, 31);

const toInt = x => parseInt(x, 10);
const split = (str) => str.trim().split(/[\s\D]+/); //space or non-digit delimeters

const isValid = (str) => {
  if (typeof (str) !== 'string' || !str) {
    return false;
  }

  const t = split(str);
  // Strictly DD/MM/YYYY. If timestamp was in the input, it is considered invalid in this requirement
  if (t.length != 3) {
    return false;
  }

  const [ d, m, y ] = t;
  return yearInRange(y) && monthInRange(m) && dayInRange(d);
};

// This will convert an input string of DD/MM/YYYY to the default JS Date compliant format MM/DD/YYYY
const toDate = (str) => {
  if (!isValid(str)) {
    return null;
  }

  const [ d, m, y ] = split(str).map(toInt);
  return gdate(y, m, d);
};

// Input: 2 dates of format DD/MM/YYYY. -1 for errors
const fullDays = (startDate, endDate) => {
  let start = toDate(startDate);
  let end = toDate(endDate);
  if (start === null || end === null) {
    return -1;
  }

  if (start === end) {
    return 0;
  }
  
  // swap start and end if end is bigger than the start
  if (start > end) {
    [ end, start ] = [ start, end ];
  }
  
  return end - start - 1;
};

module.exports = {
  fullDays,
  toDate,
};
