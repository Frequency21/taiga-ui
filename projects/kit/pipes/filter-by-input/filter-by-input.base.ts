import {
    TuiFocusableElementAccessor,
    tuiIsPresent,
    tuiPure,
    TuiStringHandler,
    TuiStringMatcher,
} from '@taiga-ui/cdk';
import {tuiIsFlat} from '@taiga-ui/kit/utils';

export type TuiArrayElement<A> = A extends ReadonlyArray<infer T>
    ? A extends ReadonlyArray<ReadonlyArray<infer G>>
        ? G
        : T
    : never;

/**
 * @deprecated: use {@link TuiArrayElement}
 * TODO: remove in v4.0
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export type ArrayElement<A> = TuiArrayElement<A>;

export abstract class AbstractTuiFilterByInput {
    protected abstract readonly accessor: TuiFocusableElementAccessor;
    protected abstract readonly multiSelect: unknown;

    protected get query(): string {
        return this.accessor.nativeFocusableElement
            ? (this.accessor.nativeFocusableElement as HTMLInputElement).value || ``
            : ``;
    }

    @tuiPure
    protected filter<T>(
        items: ReadonlyArray<readonly T[]> | readonly T[] | null,
        matcher: TuiStringMatcher<T>,
        stringify: TuiStringHandler<T>,
        query: string,
    ): ReadonlyArray<readonly T[]> | readonly T[] | null {
        if (!items) {
            return null;
        }

        return tuiIsFlat(items)
            ? this.filterFlat(items, matcher, stringify, query)
            : this.filter2d(items, matcher, stringify, query);
    }

    private filterFlat<T>(
        items: readonly T[],
        matcher: TuiStringMatcher<T>,
        stringify: TuiStringHandler<T>,
        query: string,
    ): readonly T[] {
        const match = this.getMatch(items, stringify, query);

        return tuiIsPresent(match) && !this.multiSelect
            ? items
            : items.filter(item => matcher(item, query, stringify));
    }

    private filter2d<T>(
        items: ReadonlyArray<readonly T[]>,
        matcher: TuiStringMatcher<T>,
        stringify: TuiStringHandler<T>,
        query: string,
    ): ReadonlyArray<readonly T[]> {
        const match = items.find(item =>
            tuiIsPresent(this.getMatch(item, stringify, query)),
        );

        return tuiIsPresent(match) && !this.multiSelect
            ? items
            : items.map(inner => this.filterFlat(inner, matcher, stringify, query));
    }

    private getMatch<T>(
        items: readonly T[],
        stringify: TuiStringHandler<T>,
        query: string,
    ): T | undefined {
        return items.find(
            item => stringify(item).toLocaleLowerCase() === query.toLocaleLowerCase(),
        );
    }
}
