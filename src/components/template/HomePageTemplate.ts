import ITemplate from '../model/ITemplate';

export default class HomePageTemplate implements ITemplate {
    template;
    title = 'Home | Golden Beans';
    description = 'This is a home page';

    constructor() {
        this.template = document.createElement('article');
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
            <div class="info__wrapper">
                Попробуйте кофейные зерна высочайшего качества со всего мира. У нас вы найдете вкусные сертифицированные органические кофе ручной обжарки. Побалуйте себя и пейте лучший органический кофе!
            </div>
        </section>
        <div class="home-page__content-1">
            <h4>
                Выбери свой кофе
            </h4>
        </div>
        <div class="home-page__content-2">
            <p>
                В первую очередь кофе имеет множество сортов. И каждый сорт имеет свои уникальные вкусовые качества. Есть 4 основных подсемейства. Это Арабика, Робуста, Либерика и Екcелса.
            </p>
        </div>
        <section class="home-page__coffee-sorts">
            <div class="coffee-sorts__wrapper">
                <div class="coffee-sort">
                    <h4 class="coffee-sort__title">Arabica</h4>
                    <img class="coffee-sort__img" src="https://i.postimg.cc/Bv6Rv6y1/arabica.jpg" alt="arabica">
                    <p class="coffee-sort__content">Мягкий, сладкий вкус и более сильный аромат</p>
                </div>
                <div class="coffee-sort">
                    <h4 class="coffee-sort__title">Excelca</h4>
                    <img class="coffee-sort__img" src="https://i.postimg.cc/hPLkyNTh/excelsa.jpg" alt="excelsa">
                    <p class="coffee-sort__content">Терпкий и фруктовый профиль</p>
                </div>
                <div class="coffee-sort">
                    <h4 class="coffee-sort__title">Liberica</h4>
                    <img class="coffee-sort__img" src="https://i.postimg.cc/Vkz334Wg/liberica.jpg" alt="liberica">
                    <p class="coffee-sort__content">Цветочно-фруктовый аромат. Профиль дымной древесины</p>
                </div>
                <div class="coffee-sort">
                    <h4 class="coffee-sort__title">Robusta</h4>
                    <img class="coffee-sort__img" src="https://i.postimg.cc/dVnzvdWY/robusta.jpg" alt="robusta">
                    <p class="coffee-sort__content">Землянистый, горьковатый вкусовой профиль</p>
                </div>
            </div>
        </section>
        <div class="home-page__coffee-roast">
            <div class="coffee-roast__wrapper">
                <img class="coffee-roast__image" src="https://i.postimg.cc/tgCtQtdH/roast-level.jpg" alt="roast-level">
                <div class="coffee-roast__title">
                    <p>
                        Так же кофейные зерна отличаются по cтепеням прожарки. Есть основные 3 степени: 
                    <p>
                </div>
                <div class="coffee-roast__roast-levels">
                    <div class="roast-level">
                        <p>Светлая прожарка</в>
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
                        <p>Cредняя прожарка</в>
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
                        <p>Темная прожарка</в>
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
