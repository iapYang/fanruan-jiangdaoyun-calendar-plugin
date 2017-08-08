import $ from 'jquery';
import {
    basicData,
    ChineseNumber,
    formatValue,
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
        this.$hour.text(formatValue(h));
        this.$minute.text(formatValue(m));
        this.$second.text(formatValue(s));
    }
    getValue() {
        return `${this.$hour.text()}:${this.$minute.text()}:${this.$second.text()}`;
    }
    tableEventListener() {
        this.$display.on('click', e => {
            this.$display.removeClass('selected');
            const $td = $(e.currentTarget);
            $td.addClass('selected');
        });

        this.$up.on('click', () => {
            console.log('up');
            const $selected = this.$thbody.find('.selected');
            const ifHour = $selected.hasClass('hour');
            let val = parseInt($selected.text(), 10) + 1;
            const limit = ifHour ? 24 : 60;
            val = val >= limit ? 0 : val;
            $selected.text(formatValue(val));
        });

        this.$down.on('click', () => {
            console.log('down');

            const $selected = this.$thbody.find('.selected');
            const ifHour = $selected.hasClass('hour');
            let val = parseInt($selected.text(), 10) - 1;
            const limit = ifHour ? 23 : 59;
            val = val <= -1 ? limit : val;
            $selected.text(formatValue(val));
        });
    }
}

