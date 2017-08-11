import '../style/style.scss';

import Calendar from './calendar';

new Calendar('.all');
new Calendar('.monthYear', 0);
new Calendar('.monthYearDay', 1);
new Calendar('.minuteSecond', 3);

new Calendar('.timeSet', 3).setValue('12:00:00');
