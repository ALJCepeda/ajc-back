import moment from 'moment';

export default function(value:Date) {
  const now = moment();
  const when = moment(value);

  if (Math.abs(now.diff(when, 'minutes')) < 9240) {
    return when.calendar();
  }

  if (Math.abs(now.diff(when, 'minutes')) < 481801) {
    return when.fromNow();
  }

  return when.local().format('YYYY-MM-DD HH:mm:ss');
}
