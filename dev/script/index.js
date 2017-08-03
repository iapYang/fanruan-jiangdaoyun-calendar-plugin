import $ from 'jquery';

import '../style/style.scss';
import calendar from './calendar';

const $logo = $('.logo');

$logo.on('click', () => {
    new calendar();
});
