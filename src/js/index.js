// JavaScript の import については以下を参照
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/import
import {alert_name} from './modules/alert_name';
import * as calculator from './modules/calculator';

alert_name('John');
console.log(calculator.add(9, 3));// 12
console.log(calculator.sub(9, 3));// 6