import $ from 'jquery';

const monthName = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

export default class {
    constructor($table) {
        console.log('now it is built.');

        this.$table = $table;
        this.$tbody = this.$table.find('tbody');
        this.$title = this.$table.find('.title');

        this.date = new Date();
        this.year = this.date.getFullYear();
        // 1 ~ 12
        this.month = this.date.getMonth() + 1;
        this.todayNumber = this.date.getDate();

        this.currentYear = this.year;
        this.currentMonth = this.month;
        this.currentDayNumber = this.todayNumber;
    }
    refresh(year = this.currentYear, month = this.currentMonth) {
        this.currentYear = year;
        this.currentMonth = month;
        
        this.clearDom();

        this.generateDom(this.generateCalendar(year, month));
    }
    prevMonth() {
        let year, month;
        if (this.currentMonth === 1) {
            year = this.currentYear - 1;
            month = 12;
        } else {
            year = this.currentYear;
            month = this.currentMonth - 1;
        }
        this.refresh(year, month);
    }
    getDaysInOneMonth(year, month) {
        const d = new Date(year, month, 0);

        return d.getDate();
    }
    getDayInOneMonth(year, month, dayNumber) {
        const d = new Date(year, month - 1, dayNumber);

        return d.getDay();
    }
    generateCalendar(year, month) {
        const monthDays = this.getDaysInOneMonth(year, month);
        const lastMonthDays = this.getDaysInOneMonth(year, month - 1);

        const firstDay = this.getDayInOneMonth(year, month, 1);
        const lastDay = this.getDayInOneMonth(year, month, monthDays);

        this.$title.text(`${monthName[month - 1]}月， ${year}`);

        const calendarArr = [];

        // add last month stuff
        for (let i = 0; i < firstDay; i++) {
            calendarArr.unshift({
                dayNumber: lastMonthDays - i,
                className: ['oday'],
            });
        }

        // add this month stuff
        for (let i = 1; i <= monthDays; i++) {
            // get things like Mon.
            const day = this.getDayInOneMonth(year, month, i);

            const className = ['day'];

            if (day === 0 || day === 6) {
                className.push('weekend');
            }

            if (this.todayNumber === i) {
                className.push('today');
            }

            calendarArr.push({
                dayNumber: i,
                className,
            });
        }

        // next month stuff
        const currentLength = calendarArr.length;
        for (let i = 1; i <= 6 * 7 - currentLength; i++) {
            calendarArr.push({
                dayNumber: i,
                className: ['oday'],
            });
        }

        console.log(calendarArr);

        return calendarArr;
    }
    generateDom(calendarArr) {
        for (let i = 0; i < 6; i++) {
            const $tr = $('<tr></tr>');

            for (let j = 0; j < 7; j++) {
                const index = i * 7 + j;
                const $td = $(`<td>${calendarArr[index].dayNumber}</td>`);
                calendarArr[index].className.forEach(name => {
                    $td.addClass(name);
                });
                $tr.append($td);
            }

            this.$tbody.append($tr);
        }
    }
    clearDom() {
        this.$tbody.empty();
    }
}
