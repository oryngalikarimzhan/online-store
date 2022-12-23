import ITemplate from '../model/ITemplate';
import { QueryMap, RequestPath } from '../model/Types';
import routes from './Routes';

class Router {
    private readonly routes;
    constructor() {
        this.routes = routes;
    }

    route = () => {
        const { endpoint, queries }: RequestPath = this.parsePath();

        console.log(endpoint);
        console.log(queries);

        const template: ITemplate = this.routes[endpoint] || this.routes.error404;
        const html = template.getPageTemplate();
        const contentContainer = document.querySelector('.main') as HTMLElement;
        contentContainer.innerHTML = '';
        contentContainer.append(html);

        this.addPageHeaders(template);
    };

    private addPageHeaders(template: ITemplate) {
        document.title = template.title as string;
        (document.querySelector('meta[name="description"]') as HTMLMetaElement).setAttribute(
            'content',
            template.description as string
        );
    }

    private parsePath() {
        let endpoint = window.location.hash.replace('#', '');
        let queries: QueryMap = {};
        if (endpoint.length == 0 || endpoint === '/') {
            endpoint = 'home';
        } else {
            const segments = endpoint.split('/');
            endpoint = segments[0];
            queries = this.getQueries(segments, queries);
        }
        return { endpoint, queries };
    }

    private getQueries(segments: string[], queries: QueryMap): QueryMap {
        const queriesStr = segments[1]?.replace('?', '') || '';
        queriesStr?.split('&').forEach((param) => {
            const keyValue: string[] = param.split('=');
            queries[keyValue[0]] = keyValue[1];
        });
        return queries;
    }
}

export default Router;
