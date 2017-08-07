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

        const second = this.date.getSeconds();
        const minute = this.date.getMinutes();
        const hour = this.date.getHours();

        this.setTime(hour, minute, second);
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
}

