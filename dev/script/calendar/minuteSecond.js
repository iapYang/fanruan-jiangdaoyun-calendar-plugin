import $ from 'jquery';
import {
    basicData,
    ChineseNumber,
} from './utils.js';

export default class {
    constructor($table) {
        this.$table = $table;
        this.$thbody = $table.find('.time');

        basicData(this);

        this.$hour = $table.find('td.hour');
        this.$minute = $table.find('td.minute');
        this.$second = $table.find('td.second');
        this.$display = $table.find('.display');

        const second = this.date.getSeconds();
        const minute = this.date.getMinutes();
        const hour = this.date.getHours();

        this.$up = this.$table.find('.up-btn');
        this.$down = this.$table.find('.down-btn');
        this.setTime(hour, minute, second);

        this.tableEventListener();
    }
    setTime(h, m, s) {
        this.$hour.text(this.formatValue(h));
        this.$minute.text(this.formatValue(m));
        this.$second.text(this.formatValue(s));
    }
    formatValue(value) {
        if (value < 10) {
            return `0${value}`;
        }

        return `${value}`;
    }
    tableEventListener() {
        this.$display.on('click', e => {
            this.$display.removeClass('selected');
            const $td = $(e.currentTarget);
            $td.addClass('selected');
        });

        this.$up.on('click', () => {
            console.log('up');
        });

        this.$down.on('click', () => {
            console.log('down');
        });
    }
}

