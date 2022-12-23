import './style.scss';
import App from './components/app/app';
import logo from './assets/coffee-bean-icon.svg';
import cartLogo from './assets/empty-cart.svg';
import blocks from './assets/blocks.svg';
import lines from './assets/lines.svg';
import searchIcon from './assets/search.svg';
import lightRoast from './assets/roast-level-light.svg';
import mediumRoast from './assets/roast-level-medium.svg';
import darkRoast from './assets/roast-level-dark.svg';

(document.querySelector('.logo img') as HTMLImageElement).src = logo;
(document.querySelector('.cart-logo img') as HTMLImageElement).src = cartLogo;
(document.querySelector('.view__option.view__option_checked img') as HTMLImageElement).src = blocks;
(document.querySelector('.view__option img') as HTMLImageElement).src = lines;
(document.querySelector('.search__input img') as HTMLImageElement).src = searchIcon;
(document.querySelector('.coffee-roast-level img[alt="light-roast"]') as HTMLImageElement).src = lightRoast;
(document.querySelector('.coffee-roast-level img[alt="medium-roast"]') as HTMLImageElement).src = mediumRoast;
(document.querySelector('.coffee-roast-level img[alt="dark-roast"]') as HTMLImageElement).src = darkRoast;

const app = new App();
app.start();

console.log(window.innerWidth, window.innerHeight);
