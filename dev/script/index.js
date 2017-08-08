import $ from 'jquery';

import '../style/style.scss';
import '../style/table.scss';

import Calendar from './calendar';

const $all = $('.all');
const $monthYear = $('.monthYear');
const $monthYearDay = $('.monthYearDay');

new Calendar($all);
new Calendar($monthYear, 0);
new Calendar($monthYearDay, 1);
