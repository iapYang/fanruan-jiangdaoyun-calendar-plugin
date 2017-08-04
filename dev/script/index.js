import $ from 'jquery';

import '../style/style.scss';
import Calendar from './module/calendar';

const $logo = $('.logo');
const $table = $('table');

$logo.on('click', () => {
    new Calendar($table);
});
