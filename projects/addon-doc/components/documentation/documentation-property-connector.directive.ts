import {Location} from '@angular/common';
import {
    Directive,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnInit,
    Output,
    TemplateRef,
} from '@angular/core';
import {ActivatedRoute, Params, UrlSerializer, UrlTree} from '@angular/router';
import {TUI_DOC_URL_STATE_HANDLER} from '@taiga-ui/addon-doc/tokens';
import {tuiCoerceValue} from '@taiga-ui/addon-doc/utils';
import {tuiIsNumber, TuiStringHandler} from '@taiga-ui/cdk';
import {BehaviorSubject, Subject} from 'rxjs';

const SERIALIZED_SUFFIX = '$';

export type TuiDocumentationPropertyType = 'input-output' | 'input' | 'output' | null;

/**
 * @deprecated: use {@link TuiDocumentationPropertyType}
 * TODO: remove in v4.0
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type DocumentationPropertyType = TuiDocumentationPropertyType;

// @bad TODO: refactor output and value sync
@Directive({
    selector: 'ng-template[documentationPropertyName]',
    exportAs: 'documentationProperty',
})
export class TuiDocDocumentationPropertyConnectorDirective<T>
    implements OnInit, OnChanges
{
    @Input()
    documentationPropertyName = '';

    @Input()
    documentationPropertyMode: TuiDocumentationPropertyType = null;

    @Input()
    documentationPropertyType = '';

    @Input()
    documentationPropertyValue!: T;

    @Input()
    documentationPropertyDeprecated = false;

    @Input()
    documentationPropertyValues: readonly T[] | null = null;

    @Output()
    readonly documentationPropertyValueChange = new EventEmitter<T>();

    readonly changed$ = new Subject<void>();

    readonly emits$ = new BehaviorSubject(1);

    constructor(
        @Inject(TemplateRef) readonly template: TemplateRef<Record<string, unknown>>,
        @Inject(Location) private readonly locationRef: Location,
        @Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
        @Inject(UrlSerializer) private readonly urlSerializer: UrlSerializer,
        @Inject(TUI_DOC_URL_STATE_HANDLER)
        private readonly urlStateHandler: TuiStringHandler<UrlTree>,
    ) {}

    ngOnInit(): void {
        this.parseParams(this.activatedRoute.snapshot.queryParams);
    }

    get attrName(): string {
        switch (this.documentationPropertyMode) {
            case 'input':
                return `[${this.documentationPropertyName}]`;
            case 'output':
                return `(${this.documentationPropertyName})`;
            case 'input-output':
                return `[(${this.documentationPropertyName})]`;
            default:
                return this.documentationPropertyName;
        }
    }

    get hasItems(): boolean {
        return !!this.documentationPropertyValues;
    }

    get shouldShowValues(): boolean {
        return this.documentationPropertyMode !== 'output';
    }

    ngOnChanges(): void {
        this.changed$.next();
    }

    onValueChange(value: T): void {
        this.documentationPropertyValue = value;
        this.documentationPropertyValueChange.emit(value);
        this.setQueryParam(value);
    }

    emitEvent(event: unknown): void {
        // For more convenient debugging
        console.info(this.attrName, event);

        this.emits$.next(this.emits$.value + 1);
    }

    private parseParams(params: Params): void {
        const propertyValue: string | undefined = params[this.documentationPropertyName];
        const propertyValueWithSuffix: number | string | undefined =
            params[`${this.documentationPropertyName}${SERIALIZED_SUFFIX}`];

        if (!propertyValue && !propertyValueWithSuffix) {
            return;
        }

        let value =
            !!propertyValueWithSuffix && this.documentationPropertyValues
                ? this.documentationPropertyValues[propertyValueWithSuffix as number]
                : tuiCoerceValue(propertyValue);

        if (this.documentationPropertyType === 'string' && tuiIsNumber(value)) {
            value = value.toString();
        }

        this.onValueChange(value as T);
    }

    private setQueryParam(value: T | boolean | number | string | null): void {
        const tree = this.urlSerializer.parse(this.locationRef.path());

        const isValueAvailableByKey = value instanceof Object;
        const computedValue =
            isValueAvailableByKey && this.documentationPropertyValues
                ? this.documentationPropertyValues.indexOf(value as T)
                : value;

        const suffix = isValueAvailableByKey ? SERIALIZED_SUFFIX : '';
        const propName = this.documentationPropertyName + suffix;

        tree.queryParams = {
            ...tree.queryParams,
            [propName]: computedValue,
        };

        this.locationRef.go(this.urlStateHandler(tree));
    }
}
