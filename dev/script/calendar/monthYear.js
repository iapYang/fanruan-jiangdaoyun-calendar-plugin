import $ from 'jquery';
import {
    ChineseNumber,
    basicData,
} from './utils';

export default class {
    constructor($table) {
        this.$table = $table;
        this.$tbody = this.$table.find('tbody');
        this.$container = this.$table.parent();

        basicData(this);

        this.generateCalendar();
    }
    generateCalendar() {
        let calendarArr = [];
        const leftArr = ChineseNumber.map(name => {
            return {
                value: `${name}月`,
                className: ['month'],
            };
        });
        const rightArr = [{
            value: '&lt;',
            className: ['btn', 'prevy'],
        }, {
            value: '&gt;',
            className: ['btn', 'nexty'],
        }];

        const firstThreeNum = parseInt(this.currentYear / 10, 10);
        const lastNum = this.currentYear % 10;
        
        const firstYear = firstThreeNum * 10 + 3;

        for (let i = 0; i < 10; i++) {
            rightArr.push({
                value: firstYear + i,
                className: ['year'],
            });
        }

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
    }
}
