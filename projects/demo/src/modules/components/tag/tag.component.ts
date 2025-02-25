import {Component, TemplateRef, ViewChild} from '@angular/core';
import {changeDetection} from '@demo/emulate/change-detection';
import {TuiDocExample, TuiRawLoaderContent} from '@taiga-ui/addon-doc';
import {TuiSizeL, TuiSizeS} from '@taiga-ui/core';
import {TuiStatus} from '@taiga-ui/kit';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'example-tag',
    templateUrl: './tag.template.html',
    styleUrls: ['./tag.style.less'],
    changeDetection,
})
export class ExampleTuiTagComponent {
    @ViewChild('errorIcon')
    errorTemplate?: TemplateRef<Record<string, unknown>>;

    readonly exampleOptions: TuiRawLoaderContent = import(
        './examples/import/define-options.md?raw'
    );

    readonly exampleModule: TuiRawLoaderContent = import(
        './examples/import/import-module.md?raw'
    );

    readonly exampleHtml: TuiRawLoaderContent = import(
        './examples/import/insert-template.md?raw'
    );

    readonly example1: TuiDocExample = {
        TypeScript: import('./examples/1/index.ts?raw'),
        HTML: import('./examples/1/index.html?raw'),
    };

    readonly example2: TuiDocExample = {
        TypeScript: import('./examples/2/index.ts?raw'),
        HTML: import('./examples/2/index.html?raw'),
        LESS: import('./examples/2/index.less?raw'),
    };

    readonly example3: TuiDocExample = {
        HTML: import('./examples/3/index.html?raw'),
        LESS: import('./examples/3/index.less?raw'),
    };

    readonly example4: TuiDocExample = {
        TypeScript: import('./examples/4/index.ts?raw'),
        HTML: import('./examples/4/index.html?raw'),
        LESS: import('./examples/4/index.less?raw'),
    };

    readonly example5: TuiDocExample = {
        TypeScript: import('./examples/5/index.ts?raw'),
        HTML: import('./examples/5/index.html?raw'),
    };

    readonly example6: TuiDocExample = {
        TypeScript: import('./examples/6/index.ts?raw'),
        HTML: import('./examples/6/index.html?raw'),
    };

    removable = false;

    disabled = false;

    editable = false;

    autoColor = false;

    hoverable = false;

    showLoader = false;

    value = 'John Cleese';

    maxLengthVariants: number[] = [10, 20];

    maxLength: number | null = null;

    readonly statusVariants: readonly TuiStatus[] = [
        'default',
        'primary',
        'custom',
        'success',
        'error',
        'warning',
    ];

    status = this.statusVariants[0];

    readonly sizeVariants: ReadonlyArray<TuiSizeL | TuiSizeS> = ['s', 'm', 'l'];

    size: TuiSizeL | TuiSizeS = this.sizeVariants[1];

    readonly leftContentVariants = ['', 'Error icon'];

    leftContentSelected = '';

    get leftContent(): PolymorpheusContent {
        return this.leftContentSelected && this.errorTemplate;
    }

    editTag(value: string): void {
        this.value = value;
    }
}
