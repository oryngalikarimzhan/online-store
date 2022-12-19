import ITemplate from '../model/ITemplate';

export default class CartPageTemplate implements ITemplate {
    template;
    title = 'Cart | Golden Beans';
    description = 'This is a cart page';

    constructor() {
        this.template = document.createElement('div');
        this.template.innerHTML = '<h1>Cart Page</h1>';
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
