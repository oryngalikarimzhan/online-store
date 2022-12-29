import AppRouter from '../router/AppRouter';
// import AppView from '../view/AppView';

class App {
    private readonly router: AppRouter;
    // private readonly view: AppView;

    constructor() {
        this.router = new AppRouter();
        // this.view = new AppView();
    }

    start(): void {
        this.router.init();
    }
}

export default App;
