import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {TuiPlatform} from '@taiga-ui/cdk';
import {TuiSizeS} from '@taiga-ui/core';

@Component({
    selector: 'tui-checkbox-example-1',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiCheckboxExample1 implements OnInit {
    readonly platforms: readonly TuiPlatform[] = ['web', 'web', 'android', 'ios'];
    readonly invalidTrue = new FormControl(true, () => ({invalid: true}));
    readonly invalidFalse = new FormControl(false, () => ({invalid: true}));

    ngOnInit(): void {
        this.invalidTrue.markAsTouched();
        this.invalidFalse.markAsTouched();
    }

    getSize(first: boolean): TuiSizeS {
        return first ? 'm' : 's';
    }
}
