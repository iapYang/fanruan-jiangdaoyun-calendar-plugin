import $ from 'jquery';

export default class {
    constructor() {
        console.log('now it is built.');

        this.date = new Date();
        this.year = this.date.getFullYear();
        // 1 ~ 12
        this.month = this.date.getMonth() + 1;
        this.todayNumber = this.date.getDate();

        this.monthDays = this.getDaysInOneMonth(this.year, this.month);
        this.lastMonthDays = this.getDaysInOneMonth(this.year, this.month - 1);

        this.firstDay = this.getDayInOneMonth(this.year, this.month, 1);
        this.lastDay = this.getDayInOneMonth(this.year, this.month, this.monthDays);
        
        this.calendarArr = this.generateCalendar();
    }
    getDaysInOneMonth(year, month) {
        const d = new Date(year, month, 0);

        return d.getDate();
    }
    getDayInOneMonth(year, month, dayNumber) {
        const d = new Date(year, month - 1, dayNumber);

        return d.getDay();
    }
    generateCalendar() {
        const calendarArr = [];

        // add last month stuff
        for (let i = 0; i < this.firstDay; i++) {
            calendarArr.unshift({
                dayNumber: this.lastMonthDays - i,
                className: ['oday'],
            });
        }

        // add this month stuff
        for (let i = 1; i <= this.monthDays; i++) {
            // get things like Mon.
            const day = this.getDayInOneMonth(this.year, this.month, i);

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
}
