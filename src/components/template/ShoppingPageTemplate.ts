import ITemplate from '../model/ITemplate';
import { STORENAME } from '../model/Utils';

export default class ShoppingPageTemplate implements ITemplate {
    template;
    readonly title = 'Shop | ' + STORENAME;
    readonly description = 'This is a shopping page';

    constructor() {
        this.template = document.createElement('article');
        this.template.innerHTML = `
            <section class="filters">
                <div class="filters__wrapper">
                
                <div class="filters__presets">
                    <div class="filters__reset button_small"></div>
                    <div class="filters__save button_small"></div>
                    <div class="filters__restore button_small"></div>
                </div>
                <div class="filters__coffee-sorts">
                    <p class="coffee-sorts__title">
                        Сорты кофе
                    </p>
                    <div class="coffee-sorts__content">
                        <div class="coffee-sort checkmark checkmark_checked">Arabica</div>
                        <div class="coffee-sort checkmark">Robusta</div>
                        <div class="coffee-sort checkmark">Liberica</div>
                        <div class="coffee-sort checkmark">Excelsa</div>
                    </div>
                </div>
                <div class="filters__coffee-brands">
                    <p class="coffee-brands__title">
                        Бренды кофе
                    </p>
                    <div class="coffee-brands__content">
                        <div class="coffee-brand checkmark checkmark_checked">Lavazza</div>
                        <div class="coffee-brand checkmark checkmark_checked">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                        <div class="coffee-brand checkmark">Lavazza</div>
                    </div>
                </div>
                <div class="filters__coffee-roast-levels">
                    <p class="coffee-roast-levels__title">
                        Уровень обжарки кофе
                    </p>
                    <div class="coffee-roast-levels__content">
                        <div class="coffee-roast-level coffee-roast-level_checked">
                            <img src="./assets/roast-level-light.svg" alt="light-roast">
                            <div class="coffee-roast-level__name">Светлая</div>
                        </div>
                        <div class="coffee-roast-level">
                            <img src="./assets/roast-level-medium.svg" alt="medium-roast">
                            <div class="coffee-roast-level__name">Средняя</div>
                        </div>
                        <div class="coffee-roast-level">
                            <img src="./assets/roast-level-dark.svg" alt="dark-roast">
                            <div class="coffee-roast-level__name">Темная</div>
                        </div>
                    </div>
                </div>
                <div class="filters__coffee-stock">
                    <p class="coffee-stock__title">
                        В наличии
                    </p>
                    <div class="coffee-stock__dual-slider">
                        <div class="dual-slider">
                            <div class="dual-slider__input-fields">
                                <div class="input-field text-input">
                                    <span>От:</span>
                                    <input type="number" class="stock__input_min" min="0" value="250">
                                </div>
                                <div class="input-field text-input">
                                    <span>До:</span>
                                    <input type="number" class="stock__input_max" min="0" value="750">
                                </div>
                            </div>
                            <div class="dual-slider__ranges">
                                <div class="dual-slider__line">
                                    <div class="dual-slider__progress"></div>
                                </div>
                                <div class="dual-slider__input-ranges">
                                    <input type="range" class="stock__range_min" min="0" max="1000" value="250">
                                    <input type="range" class="stock__range_max" min="0" max="1000" value="750">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                <div class="filters__coffee-prices">
                    <p class="coffee-prices__title">
                        Цена
                    </p>
                    <div class="coffee-prices__dual-slider">
                        <div class="dual-slider">
                            <div class="dual-slider__input-fields">
                                <div class="input-field text-input">
                                    <span>От:</span>
                                    <input type="number" class="stock__input_min" min="0" value="250">
                                </div>
                                <div class="input-field text-input">
                                    <span>До:</span>
                                    <input type="number" class="stock__input_max" min="0" value="750">
                                </div>
                            </div>
                            <div class="dual-slider__ranges">
                                <div class="dual-slider__line">
                                    <div class="dual-slider__progress"></div>
                                </div>
                                <div class="dual-slider__input-ranges">
                                    <input type="range" class="stock__range_min" min="0" max="1000" value="250">
                                    <input type="range" class="stock__range_max" min="0" max="1000" value="750">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </section>
            <section class="products">
                <div class="products__view">
                    <div class="view__search-box">
                        <div class="search__input text-input">
                            <input type="text">
                            <img src="./assets/search.svg" alt="search">
                        </div>
                        <div class="search__amount">
                            Найдено 30
                        </div>
                    </div>
                    <div class="view__options">
                        <div data-id="blocks" class="view__option view__option_checked button_small">
                            <img src="./assets/blocks.svg" alt="blocks">
                        </div>
                        <div data-id="lines" class="view__option button_small">
                            <img src="./assets/lines.svg" alt="lines">
                        </div>
                    </div>
                    <div class="view__sort-options">
                        <div class="select-box">
                            <div class="select-box__label">
                                <span class="select-box__sort-img"></span>
                                <span>Сортировать</span>
                                <span class="select-box__open-close"></span>
                            </div>
                            <div class="select-box__options">
                                <div class="option sort-option option__checked">от А до Z</div>
                                <div class="option sort-option">от Z до A</div>
                                <div class="option sort-option">по возростанию цены</div>
                                <div class="option sort-option">по убыванию цены</div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div class="products__list_blocks">
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/m27cHQJD/Corsica-1.webp" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Super Crema
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price button_price_checked">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                French Roast
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="https://i.postimg.cc/SRCKchZ5/Death-Wish-1.jpg" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                                Coffee Good Beans
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-sort">Бренд: Lavazza</div>
                                <div class="product__coffee-sort">Сорт: Robusta</div>
                                <div class="product__coffee-roast">Обжарка: Dark</div>
                                <div class="product__coffee-stock">В наличии: 20 штук</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>    
                                    <div class="button_price__info product__price">
                                        100$
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>`;
        this.template.classList.add('shop');
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
