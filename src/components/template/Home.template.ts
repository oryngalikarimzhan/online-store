import ITemplate from '../model/ITemplate';
import { STORENAME } from '../utilities/Constants';

export default class HomeTemplate implements ITemplate {
    template;
    readonly title = 'Home | ' + STORENAME;
    readonly description = 'This is a home page';

    constructor() {
        this.template = document.createElement('article');
        this.template.className = 'home';
        this.template.innerHTML = `
            <section class="home-page__promo">
                <div class="promo__wrapper">
                    <h2>
                        ЛУЧШИЕ КОФЕ У НАС.
                    </h2>
                    <div class="promo__button">
                        <button onclick="location.href='#shop'" class="button button_regular">
                            Купить
                        </button>
                    </div>
                </div>
            </section>
            <section class="home-page__info">
                <h3 class="info__wrapper">
                    Попробуйте кофейные зерна высочайшего качества со всего мира. У нас вы найдете вкусные сертифицированные органические кофе ручной обжарки. Побалуйте себя и пейте лучший органический кофе!
                </h3>
                <div class="shop__button">
                    <button onclick="location.href='#shop'" class="button button_regular">
                        Купить
                    </button>
                </div>
            </section>
            <div class="home-page__content-1">
                <div class="shop__button">
                    <button onclick="location.href='#shop'" class="button button_regular">
                        Купить
                    </button>
                </div>
                <h2>
                    Выбери свой кофе.
                </h2>
            </div>
            <div class="home-page__content-2">
                <div class="shop__button">
                    <button onclick="location.href='#shop'" class="button button_regular">
                        Купить
                    </button>
                </div>
                <h4>
                    При выборе кофе следует учесть, что кофе имеет множество сортов. И каждый сорт имеет свои уникальные вкусовые качества. Есть 4 основных подсемейства сортов. Это Арабика, Робуста, Либерика и Екcелса.
                </h4>
            </div>
            <section class="home-page__coffee-sorts">
                <div class="coffee-sorts__wrapper">
                    <div class="coffee-sort">
                        <h3 class="coffee-sort__title">Arabica</h3>
                        <img class="coffee-sort__img" src="https://i.postimg.cc/Bv6Rv6y1/arabica.jpg" alt="arabica">
                        <h4 class="coffee-sort__content">Мягкий, сладкий вкус и более сильный аромат</р>
                    </div>
                    <div class="coffee-sort">
                        <h3 class="coffee-sort__title">Excelca</h3>
                        <img class="coffee-sort__img" src="https://i.postimg.cc/hPLkyNTh/excelsa.jpg" alt="excelsa">
                        <h4 class="coffee-sort__content">Терпкий и фруктовый профиль</h4>
                    </div>
                    <div class="coffee-sort">
                        <h3 class="coffee-sort__title">Liberica</h3>
                        <img class="coffee-sort__img" src="https://i.postimg.cc/Vkz334Wg/liberica.jpg" alt="liberica">
                        <h4 class="coffee-sort__content">Цветочно-фруктовый аромат. Профиль дымной древесины</h4>
                    </div>
                    <div class="coffee-sort">
                        <h3 class="coffee-sort__title">Robusta</h3>
                        <img class="coffee-sort__img" src="https://i.postimg.cc/dVnzvdWY/robusta.jpg" alt="robusta">
                        <h4 class="coffee-sort__content">Землянистый, горьковатый вкусовой профиль</h4>
                    </div>
                </div>
            </section>
            <div class="home-page__coffee-roast">
                <div class="coffee-roast__wrapper">
                    <img class="coffee-roast__image" src="https://i.postimg.cc/tgCtQtdH/roast-level.jpg" alt="roast-level">
                    <div class="coffee-roast__title">
                        <h4>
                            Так же при выборе нужно знать, что кофейные зерна отличаются по cтепеням прожарки. Есть основные 3 степени:
                        <p>
                    </div>
                    <div class="coffee-roast__roast-levels">
                        <div class="roast-level">
                            <h4>Светлая прожарка</h4>
                            <ul>
                                <li>
                                    Высокая кислотность
                                </li>
                                <li>
                                    Жареный, зерновой вкус
                                </li>
                                <li>
                                    Фруктовый запах
                                </li>
                            </ul>
                        </div>
                        <div class="roast-level">
                            <h4>Cредняя прожарка</h4>
                            <ul>
                                <li>
                                    Умеренная кислотность
                                </li>
                                <li>
                                    Сахарный, сладкий вкус
                                </li>
                                <li>
                                    Сбалансированный вкус
                                </li>
                            </ul>
                        </div>
                        <div class="roast-level">
                            <h4>Темная прожарка</h4>
                            <ul>
                                <li>
                                    Низкая кислотность
                                </li>
                                <li>
                                    Горько-сладкий вкус
                                </li>
                                <li>
                                    Яркий, насыщенный вкус
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="coffee-roast__button">
                        <button onclick="location.href='#shop'" class="button button_regular">
                            Купить
                        </button>
                    </div>
                </div>
            </div>`;
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
