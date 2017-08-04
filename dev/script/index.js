import $ from 'jquery';

import '../style/style.scss';
import Calendar from './module/calendar';

const $logo = $('.logo');
const $table = $('table');
const $prevm = $('.prevm');
const $nextm = $('.nextm');
const $input = $('input');

const calendar = new Calendar($table, $input);

$logo.on('click', () => {
    calendar.refresh();
});

$prevm.on('click', () => {
    calendar.prevMonth();
});

$nextm.on('click', () => {
    calendar.nextMonth();
});
