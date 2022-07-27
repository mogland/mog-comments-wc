import { LitElement } from 'lit';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export declare class NxComments extends LitElement {
    /**
     * Whether to enable OwO selector
     */
    owoSelectorState: boolean;
    /**
     * Whether to enable Emoji selector
     */
    emojiSelectorState: boolean;
    /**
     * OwO Config File Url
     */
    owoUrl?: string | undefined;
    render(): import("lit").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'nx-comments': NxComments;
    }
}
