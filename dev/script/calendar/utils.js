module.exports = {
    ChineseNumber: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    basicData(vm) {
        vm.date = new Date();
        vm.year = vm.date.getFullYear();
        // 1 ~ 12
        vm.month = vm.date.getMonth() + 1;
        vm.todayNumber = vm.date.getDate();

        vm.currentYear = vm.year;
        vm.currentMonth = vm.month;
    },
    formatValue(val, number = 2) {
        const length = val.toString().length;
        const needZero = number - length;

        let formatted = `${val}`;

        for (let i = 0; i < needZero; i++) {
            formatted = `0${formatted}`;
        }

        return formatted;
    },
};
