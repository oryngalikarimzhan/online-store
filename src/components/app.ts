import AppRouter from './router/AppRouter';

class App {
    private readonly router: AppRouter;

    constructor() {
        this.router = new AppRouter();
    }

    start(): void {
        this.router.init();
    }
}

export default App;
