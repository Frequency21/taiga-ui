import {NgModule} from '@angular/core';

import {TuiFadeComponent} from './fade.component';
import {TuiFadeDirective} from './fade.directive';

@NgModule({
    declarations: [TuiFadeComponent, TuiFadeDirective],
    exports: [TuiFadeDirective],
})
export class TuiFadeModule {}
