import $ from 'jquery';

import '../style/style.scss';
import '../style/table.scss';

import Calendar from './calendar';

const $logo = $('.logo');
const $input = $('input');
const $all = $('.all');
const $monthYear = $('.monthYear');
const $monthYearDay = $('.monthYearDay');

new Calendar($all);
new Calendar($monthYear, 0);
new Calendar($monthYearDay, 1);

// const calendar = new Calendar($table, $input);

// $logo.on('click', () => {
//     calendar.refresh();
// });

// $prevm.on('click', () => {
//     calendar.prevMonth();
// });

// $nextm.on('click', () => {
//     calendar.nextMonth();
// });
