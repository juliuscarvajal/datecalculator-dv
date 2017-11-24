import test from 'ava';
import { fullDays, toDate } from './calculator';

test('should return the days between 2 dates. The start and end dates are not counted.', t => {
  t.is(fullDays('1/1/2000', '3/1/2000'), 1);
  t.is(fullDays('01/01/2000', '03/01/2000'), 1);
  t.is(fullDays('02/06/1983', '22/06/1983'), 19);
  t.is(fullDays('04/07/1984', '25/12/1984'), 173);
  t.is(fullDays('03/01/1989', '03/08/1983'), 1979);
  t.is(fullDays('01/01/1901', '31/12/2999'), 401400);
});

test('should return 0 if the difference between the dates is only 1 day', t => {
  t.is(fullDays('7/11/1972', '8/11/1972'), 0);
  t.is(fullDays('07/11/1972', '08/11/1972'), 0);
  t.is(fullDays('31/12/2015', '01/01/2016'), 0);    
});

test('should return -1 if there are any invalid dates.', t => {
  t.is(fullDays('25/25/2020', '8/11/2020'), -1);
  t.is(fullDays('1/25/2020', '8/11/3030'), -1);
});

test('should convert an invalid string date format to null', t => {
  t.is(toDate(''), null);
  t.is(toDate(null), null);
  t.is(toDate(undefined), null);
  t.is(toDate(NaN), null);
  t.is(toDate(0), null);
  t.is(toDate(100000), null);
  t.is(toDate({}), null);
  t.is(toDate([]), null);
  t.is(toDate(true), null);
  t.is(toDate(false), null);
  t.is(toDate('a'), null);    
  t.is(toDate('07/11/1972 12:00:01'), null);
  t.is(toDate('O7/11/1972'), null);
  t.is(toDate('25/25/1972'), null);
  t.is(toDate('2090/01/01'), null);
  t.is(toDate('a/b/c'), null);    
  t.is(toDate('1/1/1'), null);
  t.is(toDate('0/0/1901'), null);
  t.is(toDate(' 0 7 / 0 7 / 1 9 7 7 '), null);
  t.is(toDate('31/12/1899'), null);
  t.is(toDate('01/01/3000'), null);
});
