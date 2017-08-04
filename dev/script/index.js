import $ from 'jquery';

import '../style/style.scss';
import '../style/table.scss';

import Calendar from './calendar';

const $logo = $('.logo');
const $input = $('input');
const $container = $('.container');

new Calendar($container);

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
