import ITemplate from '../model/ITemplate';

export default class HomePageTemplate implements ITemplate {
    template;
    title = 'Home | Golden Beans';
    description = 'This is a home page';

    constructor() {
        this.template = document.createElement('div');
        this.template.innerHTML = '<h1>Home Page</h1>';
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
