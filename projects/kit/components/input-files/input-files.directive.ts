import {Directive, ElementRef, forwardRef, HostBinding, Inject} from '@angular/core';
import {TuiIdService} from '@taiga-ui/cdk';

// eslint-disable-next-line import/no-cycle
import {TuiInputFilesComponent} from './input-files.component';
import {TUI_INPUT_FILES_OPTIONS, TuiInputFilesOptions} from './input-files.options';

@Directive({
    selector: 'input[tuiInputFiles]',
    host: {
        type: 'file',
        class: 't-native',
    },
})
export class TuiInputFilesDirective {
    constructor(
        @Inject(forwardRef(() => TuiInputFilesComponent))
        readonly host: TuiInputFilesComponent,
        @Inject(ElementRef) private readonly el: ElementRef<HTMLInputElement>,
        @Inject(TuiIdService) private readonly idService: TuiIdService,
        @Inject(TUI_INPUT_FILES_OPTIONS) private readonly options: TuiInputFilesOptions,
    ) {}

    @HostBinding('tabIndex')
    get tabIndex(): number {
        return this.host.focusable ? 0 : -1;
    }

    @HostBinding('id')
    get id(): string {
        return this.el.nativeElement.id || this.idService.generate();
    }

    @HostBinding('accept')
    get accept(): string {
        return this.el.nativeElement.accept ?? this.options.accepts;
    }

    @HostBinding('multiple')
    get multiple(): boolean {
        return this.el.nativeElement.multiple ?? this.options.multiple;
    }

    @HostBinding('attr.capture')
    get capture(): string | null {
        return this.el.nativeElement.getAttribute('capture') ?? this.options.capture;
    }

    get input(): HTMLInputElement {
        return this.el.nativeElement;
    }
}
