import '../style/style.scss';

import Calendar from './calendar';

new Calendar('.monthYear', 0);
new Calendar('.monthYearDay', 1);
new Calendar('.all');
new Calendar('.minuteSecond', 3);

new Calendar('.mYSet', 0).setValue('2009-08');
new Calendar('.mYDSet', 1).setValue('2000-12-31');
new Calendar('.timeSet', 3).setValue('12:00:00');
