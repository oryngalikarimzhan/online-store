import './style.scss';
import App from './components/app/app';
import logo from './assets/coffee-bean-icon.svg';

(document.querySelector('.logo img') as HTMLImageElement).src = logo;

const app = new App();
app.start();
