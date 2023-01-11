export default interface ITemplate {
    template: HTMLElement;
    title: string;
    description: string;
    getPageTemplate(): HTMLElement;
}
