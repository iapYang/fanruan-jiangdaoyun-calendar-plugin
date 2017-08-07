import $ from 'jquery';
import {
    ChineseNumber,
    basicData,
} from './utils';

export default class {
    constructor($table, vm) {
        this.$table = $table;
        this.$tbody = this.$table.find('tbody');
        this.$container = this.$table.parent();

        this.$btnOk = this.$table.find('.btn.ok');

        basicData(this);

        this.selectedYear = this.year;
        this.selectedMonth = this.month;
        this.yearRange = this.setYearRange();

        this.generateCalendar();

        this.tableEventListener();
    }
    setConnetion(vm) {
        this.vm = vm;
    }
    setYearRange() {
        const arr = [];

        const firstThreeNum = parseInt(this.currentYear / 10, 10);
        const lastNum = this.currentYear % 10;

        const firstYear = firstThreeNum * 10 + 3;

        for (let i = 0; i < 10; i++) {
            const value = firstYear + i;
            arr.push(value);
        }

        return arr;
    }
    generateCalendar() {
        let calendarArr = [];
        const leftArr = ChineseNumber.map((name, index) => {
            return {
                value: `${name}月`,
                className: index === this.month - 1 ? ['month', 'selected'] : ['month'],
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
                    className: value === this.year ? ['selected', 'year'] : ['year'],
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

        $months.on('click', e => {
            const $td = $(e.currentTarget);
            const index = $td.index('td.month');
            $months.removeClass('selected');
            $td.addClass('selected');

            this.selectedMonth = index + 1;
        });

        $years.on('click', e => {
            const $td = $(e.currentTarget);
            const index = $td.index('td.year');
            $years.removeClass('selected');
            $td.addClass('selected');

            this.selectedYear = index;
        });
    }
    sendValue() {
        this.vm.setMonthYear(
            this.yearRange[this.selectedYear],
            this.selectedMonth
        );
    }
    tableEventListener() {
        this.$btnOk.on('click', () => {
            this.$table.removeClass('active');
            this.sendValue();
        });
    }
}
