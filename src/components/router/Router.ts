import ITemplate from '../model/ITemplate';
import routes from './Routes';

class Router {
    private readonly routes;
    constructor() {
        this.routes = routes;
    }

    route = () => {
        let location = window.location.hash.replace('#', '');
        let query = '';
        const queries: { [key: string]: string } = {};
        if (location.length == 0 || location === '/') {
            location = 'home';
        } else {
            const urlArr = location.split('/');
            location = urlArr[0];
            query = urlArr[1]?.replace('?', '') || '';
            query?.split('&').forEach((param) => {
                const keyValue: string[] = param.split('=');
                queries[keyValue[0]] = keyValue[1];
            });
        }

        console.log(location);
        console.log(queries);
        console.log(this.routes[location]);

        const route: ITemplate = this.routes[location] || this.routes.error404;
        const html = route.getPageTemplate();
        (document.querySelector('.content') as HTMLElement).innerHTML = '';
        (document.querySelector('.content') as HTMLElement).append(html);
        document.title = route.title as string;
        (document.querySelector('meta[name="description"]') as HTMLMetaElement).setAttribute(
            'content',
            route.description as string
        );
    };
}

export default Router;
