import $ from 'jquery';

const monthName = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];

export default class {
    constructor($table, $input) {
        console.log('now it is built.');

        this.$table = $table;
        this.$prevm = $table.find('.prevm');
        this.$nextm = $table.find('.nextm');
        this.$tbody = this.$table.find('tbody');
        this.$title = this.$table.find('.title');
        this.$input = $input;

        this.date = new Date();
        this.year = this.date.getFullYear();
        // 1 ~ 12
        this.month = this.date.getMonth() + 1;
        this.todayNumber = this.date.getDate();

        this.currentYear = this.year;
        this.currentMonth = this.month;
        this.selectedDayNumber = this.todayNumber;

        this.refresh();
        this.tableEventListener();
    }
    refresh(year = this.currentYear, month = this.currentMonth) {
        this.currentYear = year;
        this.currentMonth = month;

        this.clearDom();

        this.generateDom(this.generateCalendar(year, month));

        this.tdEventListener();
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
    nextMonth() {
        let year, month;
        if (this.currentMonth === 12) {
            year = this.currentYear + 1;
            month = 1;
        } else {
            year = this.currentYear;
            month = this.currentMonth + 1;
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
    setMonthYear(year, month) {
        this.$title.text(`${monthName[month - 1]}月， ${year}`);
    }
    generateCalendar(year, month) {
        const monthDays = this.getDaysInOneMonth(year, month);
        const lastMonthDays = this.getDaysInOneMonth(year, month - 1);

        const firstDay = this.getDayInOneMonth(year, month, 1);
        const lastDay = this.getDayInOneMonth(year, month, monthDays);

        this.setMonthYear(year, month);

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

            const className = ['day', 'btn'];

            if (day === 0 || day === 6) {
                className.push('weekend');
            }

            if (this.todayNumber === i && month === this.month) {
                className.push('today');
            }

            if (i === this.selectedDayNumber) {
                className.push('selected');
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
                $td.data('timestamp', {
                    year: this.currentYear,
                    month: this.currentMonth,
                });
                $tr.append($td);
            }

            this.$tbody.append($tr);
        }
    }
    clearDom() {
        this.$tbody.empty();
    }
    tdEventListener() {
        const $tds = this.$table.find('td.day');

        $tds.on('click', e => {
            const $td = $(e.currentTarget);
            this.selectedDayNumber = parseInt($td.text(), 10);
            $tds.removeClass('selected');
            $td.addClass('selected');

            this.$input.val(this.getValue());
        });
    }
    tableEventListener() {
        this.$prevm.on('click', () => {
            this.prevMonth();
        });
        this.$nextm.on('click', () => {
            this.nextMonth();
        });
        this.$title.on('click', () => {
            const $mt = this.$table.parent().find('.mt');
            $mt.addClass('active');
        });
    }
    getValue() {
        const month = this.currentMonth < 10 ? `0${this.currentMonth}` : this.currentMonth;

        const dayNumber = this.selectedDayNumber < 10 ? `0${this.selectedDayNumber}` : this.selectedDayNumber;

        return `${this.currentYear}-${month}-${dayNumber}`;
    }
}
