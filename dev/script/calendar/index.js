import $ from 'jquery';
import MonthDay from './monthDay';
import MonthYear from './monthYear';
import MinuteSecond from './minuteSecond';

import {
    formatValue,
} from './utils.js';

export default class {
    constructor($aim, type = 2) {
        this.$aim = $aim;
        this.type = type;
        this.$input = this.$aim.find('input');
        this.$logo = this.$aim.find('.logo');

        this.createModel = [{
            dt: false,
            mt: true,
            ms: false,
        }, {
            dt: true,
            mt: true,
            ms: false,
        }, {
            dt: true,
            mt: true,
            ms: true,
        }, {
            dt: false,
            mt: false,
            ms: true,
        }];

        this.$container = $('<div class="table-container"></div>');

        if (this.createModel[this.type].dt) {
            this.$dt = this.createDT();
            this.vmMd = new MonthDay(this.$dt);
        }

        if (this.createModel[this.type].mt) {
            this.$mt = this.createMT();
            this.vmMy = new MonthYear(this.$mt);
        }

        if (this.createModel[this.type].ms) {
            this.vmMs = new MinuteSecond(this.$dt);
        }

        this.$container.css(this.calcPostion());

        $('body').append(this.$container);

        this.addEventListener();
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
        const ms = this.createModel[this.type].ms ? `
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
        ` : '';
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
            ${ms}
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
        const activeClassName = this.createModel[this.type].dt ? '' : 'inactive';
        const $MT = $(`
        <table cellspacing="2px" cellpadding="0" class="mt ${activeClassName}" style="top: 0px; z-index: 8061; display: table;">
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
    setInputVal(value) {
        this.$input.val(value);
    }
    getValue() {
        if (this.type === 0) {
            
        } else if (this.type === 1) {
            this.setInputVal(this.vmMd.getValue());
        } else if (this.type === 2) {
            console.log(56);
        } else if (this.type === 3) {
            console.log(56);
        }
    }
    addEventListener() {
        this.$logo.on('click', () => {
            if (this.$container.hasClass('active')) {
                this.$container.removeClass('active');
            } else {
                this.$container.addClass('active');
            }
        });

        this.$container.on('changeData', (e, year, month) => {
            if (this.vmMd) {
                this.vmMd.refresh(year, month);
            }
            if (this.vmMy) {
                this.vmMy.refresh(year, month);
            }
            if (this.type === 0) {
                this.setInputVal(this.vmMy.getValue());
            } else if (this.type === 1) {
                this.setInputVal(this.vmMd.getValue());
            } else if (this.type === 2) {
                this.setInputVal(`${this.vmMd.getValue()} ${this.vmMs.getValue()}`);
            } else if (this.type === 3) {
                console.log(56);
            }
        });

        this.$container.on('clearData', () => {
            this.setInputVal('');
            this.$logo.trigger('click');
        });

        this.$container.on('close', () => {
            this.$container.removeClass('active');
        });
    }
}
