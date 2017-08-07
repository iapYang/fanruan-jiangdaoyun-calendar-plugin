import $ from 'jquery';
import MonthDay from './monthDay';
import MonthYear from './monthYear';
import MinuteSecond from './minuteSecond';

export default class {
    constructor($aim) {
        this.$aim = $aim;
        this.$input = this.$aim.find('input');

        this.$container = $('<div class="table-container"></div>');
        this.$dt = this.createDT();
        this.vmMd = new MonthDay(this.$dt, this.$input);

        this.$mt = this.createMT();
        this.vmMy = new MonthYear(this.$mt);

        this.vmMy.setConnetion(this.vmMd);
        this.vmMd.setConnection(this.vmMy);

        new MinuteSecond(this.$dt);

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
            <tbody onselectstart="return false" class="calendar"></tbody>
            <tbody class="time">
                <tr>
                    <td>时间</td>
                    <td colspan="2" class="hour display"></td>
                    <td class="minute display"></td>
                    <td colspan="2" class="second display selected"></td>
                    <td class="controller">
                        <div class="up-btn"><span>&lt;</span></div>
                        <div class="down-btn"><span>&gt;</span></div>
                    </td>                    
                </tr>
            </tbody>
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
    createMT() {
        const $MT = $(`
        <table cellspacing="2px" cellpadding="0" class="mt" style="position: absolute; top: 0px; z-index: 8061; display: table;">
            <tbody></tbody>
            <tfoot>
                <tr>
                    <td class="btn ok" colspan="4">确定</td>
                </tr>
            </tfoot>
        </table>`);

        this.$container.append($MT);

        return $MT;
    }
}
