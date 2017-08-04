import $ from 'jquery';
import MonthDay from './monthDay';

export default class {
    constructor($aim) {
        this.$aim = $aim;
        this.$input = this.$aim.find('input');

        this.$container = $('<div class="table-container"></div>');
        this.$dt = this.createDT();
        new MonthDay(this.$dt, this.$input);

        this.$container.css(this.calcPostion());

        $('body').append(this.$container);
    }
    calcPostion() {
        const top = this.$aim.position().top + this.$aim.height();
        const left = this.$aim.position().left;

        return {
            top,
            left,
            width: this.$aim.width(),
        };
    }
    createDT() {
        const $dt = $(`
        <table cellspacing="2px" cellpadding="0" class="dt" style="display: table;">
            <thead>
                <tr class="mainhead">
                    <td class="btn prevm" colspan="1">
                        <i class="icon-angleleft">&lt;</i>
                    </td>
                    <td class="title" colspan="5"></td>
                    <td class="btn nextm" colspan="1">
                        <i class="icon-angleleft">&gt;</i>
                    </td>
                </tr>
                <tr>
                    <td class="name weekend">日</td>
                    <td class="name">一</td>
                    <td class="name">二</td>
                    <td class="name">三</td>
                    <td class="name">四</td>
                    <td class="name">五</td>
                    <td class="name weekend">六</td>
                </tr>
            </thead>
            <tbody onselectstart="return false"></tbody>
            <tfoot>
                <tr>
                    <td class="split" colspan="7"></td>
                </tr>
                <tr>
                    <td class="btn clear" colspan="2">清空</td>
                    <td class="btn today" colspan="3">今天</td>
                    <td class="btn ok" colspan="2">确定</td>
                </tr>
            </tfoot>
        </table>`);
        this.$container.append($dt);

        return $dt;
    }
}
