import $ from 'jquery';

import '../style/style.scss';
import Calendar from './calendar';

const $logo = $('.logo');

$logo.on('click', () => {
    new Calendar();
});
