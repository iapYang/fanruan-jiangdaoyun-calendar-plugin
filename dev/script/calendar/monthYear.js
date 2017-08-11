import $ from 'jquery';
import {
    ChineseNumber,
    basicData,
    formatValue,
} from './utils';

export default class {
    constructor($table, vm) {
        this.$table = $table;
        this.$tbody = this.$table.find('tbody');
        this.$container = this.$table.parent();

        basicData(this);

        this.$btnOk = this.$table.find('.btn.ok');

        this.selectedYear = this.year;
        this.selectedMonth = this.month;
        this.yearRange = this.setYearRange();

        this.generateCalendar();

        this.tableEventListener();
    }
    setConnetion(vm) {
        this.vm = vm;
    }
    setYearRange(year = this.selectedYear, month = this.selectedMonth) {
        this.selectedYear = year;
        this.selectedMonth = month;

        const arr = [];

        const lastNum = year % 10;
        const firstThreeNum = lastNum < 3 ? parseInt(year / 10, 10) - 1 : parseInt(year / 10, 10);

        const firstYear = firstThreeNum * 10 + 3;

        for (let i = 0; i < 10; i++) {
            const value = firstYear + i;
            arr.push(value);
        }

        return arr;
    }
    refresh(year, month) {
        this.clearDom();
        this.yearRange = this.setYearRange(year, month);
        this.generateCalendar();
    }
    generateCalendar() {
        let calendarArr = [];
        const leftArr = ChineseNumber.map((name, index) => {
            return {
                value: `${name}月`,
                className: index === this.selectedMonth - 1 ? ['month', 'selected'] : ['month'],
            };
        });
        let rightArr = [{
            value: '&lt;',
            className: ['btn', 'prevy'],
        }, {
            value: '&gt;',
            className: ['btn', 'nexty'],
        }];

        rightArr = [
            ...rightArr,
            ...this.yearRange.map(value => {
                return {
                    value,
                    className: value === this.selectedYear ? ['selected', 'year'] : ['year'],
                };
            }),
        ];

        for (let i = 0; i < 6; i++) {
            const begin = i * 2;
            const end = i * 2 + 2;
            calendarArr = [
                ...calendarArr,
                ...leftArr.slice(begin, end),
                ...rightArr.slice(begin, end),
            ];
        }

        for (let i = 0; i < 6; i++) {
            const $tr = $('<tr></tr>');
            for (let j = 0; j < 4; j++) {
                const index = i * 4 + j;
                const $td = $(`<td>${calendarArr[index].value}</td>`);

                calendarArr[index].className.forEach(name => {
                    $td.addClass(name);
                });

                $tr.append($td);
            }

            this.$tbody.append($tr);
        }

        this.tdEventListener();
    }
    tdEventListener() {
        const $months = this.$table.find('td.month');
        const $years = this.$table.find('td.year');
        const $btnPrevy = this.$table.find('.prevy');
        const $btnNexty = this.$table.find('.nexty');

        $months.on('click', e => {
            const $td = $(e.currentTarget);
            const $month = this.$table.find('td.month');
            const index = $month.index($td);

            $months.removeClass('selected');
            $td.addClass('selected');

            this.selectedMonth = index + 1;
        });

        $years.on('click', e => {
            const $td = $(e.currentTarget);
            const $year = this.$table.find('td.year');

            const index = $years.index($td);
            $years.removeClass('selected');
            $td.addClass('selected');

            this.selectedYear = this.yearRange[index];
        });

        $btnPrevy.on('click', () => {
            this.yearRange = this.yearRange.map(value =>
                value - 10
            );
            this.selectedYear -= 10;
            this.clearDom();
            this.sendValue();
        });

        $btnNexty.on('click', () => {
            this.yearRange = this.yearRange.map(value =>
                value + 10
            );
            this.selectedYear += 10;
            this.clearDom();
            this.sendValue();
        });
    }
    getValue() {
        return `${this.selectedYear}-${formatValue(this.selectedMonth)}`;
    }
    setValue(value) {
        const arr = value.split('-');
        const year = parseInt(arr[0], 10);
        const month = parseInt(arr[1], 10);

        if (!(month <= 12 && month > 0)) {
            console.log('input error');

            return;
        }

        this.selectedYear = year;
        this.selectedMonth = month;
        this.sendValue();
    }
    sendValue() {
        const year = this.selectedYear;
        const month = this.selectedMonth;
        this.$container.trigger('changeData', [year, month]);
    }
    tableEventListener() {
        this.$btnOk.on('click', () => {
            this.$table.removeClass('active');
            this.sendValue();
            if (this.$table.hasClass('inactive')) {
                this.$container.trigger('close');
            }
        });
    }
    clearDom() {
        this.$tbody.empty();
    }
}
