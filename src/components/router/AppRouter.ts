import AppController from '../controller/AppController';
import { QueryMap, RequestParams } from '../data/Types';

class AppRouter {
    readonly controller: AppController;
    readonly routes = new Map([
        ['shop', 'getShopPage'],
        ['/', 'getHomePage'],
        ['product', 'getProductPage'],
        ['cart', 'getCartPage'],
    ]);

    constructor() {
        this.controller = new AppController();
    }

    init = () => {
        window.addEventListener('hashchange', this.route);
        this.route();
    };

    private route = () => {
        const requestParams: RequestParams = AppRouter.parsePath();
        // console.group('REQUEST');
        // console.log('hash =', window.location.hash);
        // console.log('endpoint =', requestParams.endpoint);
        // console.log('queries =', requestParams.queries);
        // console.groupEnd();

        const controllerMethod = this.routes.get(requestParams.endpoint);
        if (controllerMethod) {
            this.controller[controllerMethod as keyof AppController](requestParams);
        } else {
            this.controller['getNotFoundPage' as keyof AppController](requestParams);
        }
    };

    static parsePath = () => {
        const hash = window.location.hash.replace('#/', '');
        if (hash.length == 0) {
            return { endpoint: '/' };
        }
        const [endpoint, params] = hash.split('/');
        return { endpoint, queries: AppRouter.getQueries(params) };
    };

    // FOR TEST ?roast=medium,dark&sorts=robusta,arabica&prices=20,30&order=name,asc&stock=40,50&brands=lavazza,stumptown+coffee+roasters,illy
    static getQueries = (params: string): QueryMap => {
        const queries: QueryMap = {};
        const searchParams = new URLSearchParams(params);
        for (const param of searchParams) {
            queries[param[0]] = param[1].split(',') || param[1];
        }
        return queries;
    };
}

export default AppRouter;
