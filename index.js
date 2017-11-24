const { fullDays } = require('./src/calculator');
const path = require('path');
const args = process.argv.slice(2);
const [ startDate, endDate ] = args;


function help() {
  const helpMsg = `
  Days calculator:
  
  Returns the number of days elapsed between 2 dates.
  The start and the end dates are not counted.
  
  Usage: ${path.basename(process.argv[0])} ${path.basename(process.argv[1])} dd/mm/yyyy dd/mm/yyyy
  
  Where:
  yyyy is within 1901 to 2999
  mm is within 1 to 12
  dd is within 1 to 31    
  `;

  console.log(helpMsg);
}

function show() {
  const days = fullDays(startDate, endDate);
  return (days == -1)
    ? help()
    : console.log(days);
}

if (args.length != 2) {
  help();
} else {
  show();
}
