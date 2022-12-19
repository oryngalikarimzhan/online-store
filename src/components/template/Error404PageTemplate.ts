import ITemplate from '../model/ITemplate';

export default class Error404PageTemplate implements ITemplate {
    template;
    title = '404 | Golden Beans';
    description = 'Page not found';

    constructor() {
        this.template = document.createElement('div');
        this.template.innerHTML = '<h1>404 Page</h1>';
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
