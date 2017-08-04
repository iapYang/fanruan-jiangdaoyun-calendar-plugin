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
};
