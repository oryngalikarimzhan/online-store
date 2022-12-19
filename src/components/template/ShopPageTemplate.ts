import ITemplate from '../model/ITemplate';

export default class ShopPageTemplate implements ITemplate {
    template;
    title = 'About Us | Golden Beans';
    description = 'This is an about page';

    constructor() {
        this.template = document.createElement('div');
        this.template.innerHTML = '<h1>About us Page</h1>';
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
