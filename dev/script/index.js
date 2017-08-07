import $ from 'jquery';

import '../style/style.scss';
import '../style/table.scss';

import Calendar from './calendar';

const $logo = $('.logo');
const $input = $('input');
const $all = $('.all');

new Calendar($all);

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
