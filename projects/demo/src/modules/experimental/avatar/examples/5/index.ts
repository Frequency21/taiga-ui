import {Component} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {encapsulation} from '@demo/emulate/encapsulation';
import {tuiAvatarOptionsProvider} from '@taiga-ui/experimental';

@Component({
    selector: 'tui-avatar-example-5',
    templateUrl: './index.html',
    providers: [tuiAvatarOptionsProvider({size: 'l'})],
    changeDetection,
    encapsulation,
})
export class TuiAvatarExample5 {}
