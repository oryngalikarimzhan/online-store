import ITemplate from '../model/ITemplate';
import { STORENAME } from '../model/Utils';

export default class CartPageTemplate implements ITemplate {
    template;
    readonly title = 'Cart | ' + STORENAME;
    readonly description = 'This is a cart page';

    constructor() {
        this.template = document.createElement('div');
        this.template.innerHTML = '<h1>Cart Page</h1>';
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
