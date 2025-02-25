import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';

@Component({
    selector: 'tui-surface-example-1',
    templateUrl: './index.html',
    styleUrls: ['./base.less', './index.less'],
    changeDetection,
    encapsulation,
})
export class TuiSurfaceExample1 {}
