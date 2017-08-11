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
        this.$container = $table.parent();

        this.ifSingleTable = $table.hasClass('time-table');

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
        this.$btnClear = this.$table.find('.btn.clear');
        this.$btnToday = this.$table.find('.btn.today');
        this.$btnOk = this.$table.find('.btn.ok');
        this.setTime(hour, minute, second);

        this.tableEventListener();
    }
    setTime(h, m, s) {
        this.$hour.text(formatValue(h));
        this.$minute.text(formatValue(m));
        this.$second.text(formatValue(s));
    }
    setValue(value) {
        const arr = value.split(':');
        const h = parseInt(arr[0], 10);
        const m = parseInt(arr[1], 10);
        const s = parseInt(arr[2], 10);

        if (!(h >= 0 && h < 24)) {
            console.log('input data error');

            return;
        }

        if (!(m >= 0 && m < 60)) {
            console.log('input data error');

            return;
        }

        if (!(s >= 0 && s < 60)) {
            console.log('input data error');

            return;
        }

        this.setTime(arr[0], arr[1], arr[2]);
        this.$btnOk.trigger('click');
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

        if (this.ifSingleTable) {
            this.$btnClear.on('click', () => {
                this.$container.trigger('clearData');
                this.$container.trigger('close');
            });

            this.$btnToday.on('click', () => {
                const now = new Date();
                this.setTime(now.getHours(), now.getMinutes(), now.getSeconds());
                this.$container.trigger('changeData');
                this.$container.trigger('close');
            });

            this.$btnOk.on('click', () => {
                this.$container.trigger('changeData');
                this.$container.trigger('close');
            });
        }
    }
}

