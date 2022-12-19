import Router from '../router/Router';
// import { AppView } from '../view/appView';
// import data from './data.json';

class App {
    private readonly router: Router;
    // private readonly view: AppView;

    constructor() {
        this.router = new Router();
        // this.view = new AppView();
    }

    start(): void {
        // document
        //     .querySelector('.sources')
        //     ?.addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        // this.controller.getSources((data) => this.view.drawSources(data));
        // this.view.drawSources(data);
        window.addEventListener('hashchange', this.router.route);
        this.router.route();
    }
}

export default App;
