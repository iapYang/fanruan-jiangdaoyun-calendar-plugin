import $ from 'jquery';

import '../style/style.scss';
import Calendar from './module/calendar';

const $logo = $('.logo');
const $table = $('table');

const calendar = new Calendar($table);

$logo.on('click', () => {
    console.log(788);
});
