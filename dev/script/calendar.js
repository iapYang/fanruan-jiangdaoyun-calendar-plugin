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
        
        this.firstDay = this.getDayInThisMonth(1);
        this.calendarArr = [];

        // add last month stuff
        for (let i = 0; i < this.firstDay; i++) {
            this.calendarArr.unshift({
                dayNumber: this.lastMonthDays - i,
                className: ['oday'],
            });
        }

        // add this month stuff
        for (let i = 1; i <= this.monthDays; i++) {
            // get things like Mon.
            const day = this.getDayInThisMonth(i);

            const className = ['day'];

            if (day === 0 || day === 6) {
                className.push('weekend');
            }

            if (this.todayNumber === i) {
                className.push('today');
            }

            this.calendarArr.push({
                dayNumber: i,
                className,
            });
        }

        console.log(this.calendarArr);
    }
    getDaysInOneMonth(year, month) {
        const d = new Date(year, month, 0);

        return d.getDate();
    }
    getDayInThisMonth(dayNumber) {
        const d = new Date(this.year, this.month - 1, dayNumber);

        return d.getDay();
    }
}
