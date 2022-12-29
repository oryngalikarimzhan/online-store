import ITemplate from '../model/ITemplate';
import { STORENAME } from '../utilities/Constants';

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
                    <div content="Сбросить фильтр" class="filters__reset button_small"></div>
                    <div content="Сохранить фильтр" class="filters__save button_small"></div>
                    <div content="Восстановить фильтр" class="filters__restore button_small"></div>
                </div>
                <div class="filters__coffee-sorts">
                    <p class="coffee-sorts__title">
                        Сорты кофе
                    </p>
                    <div class="coffee-sorts__content">
                        <div id="arabica" class="coffee-sort checkmark">Арабика</div>
                        <div id="robusta" class="coffee-sort checkmark">Робуста</div>
                        <div id="liberica" class="coffee-sort checkmark">Либерика</div>
                        <div id="excelsa" class="coffee-sort checkmark">Екcелса</div>
                    </div>
                </div>
                <div class="filters__coffee-brands">
                    <p class="coffee-brands__title">
                        Бренды кофе
                    </p>
                    <div class="coffee-brands__content">
                    </div>
                </div>
                <div class="filters__coffee-roast-levels">
                    <p class="coffee-roast-levels__title">
                        Уровень обжарки кофе
                    </p>
                    <div class="coffee-roast-levels__content">
                        <div id="light" class="coffee-roast-level">
                            <div class="roast-img"></div>
                            <div class="coffee-roast-level__name">Светлая</div>
                        </div>
                        <div id="medium" class="coffee-roast-level">
                            <div class="roast-img"></div>
                            <div class="coffee-roast-level__name">Средняя</div>
                        </div>
                        <div id="dark" class="coffee-roast-level">
                            <div class="roast-img"></div>
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
                                    <input type="number" class="input_from">
                                </div>
                                <div class="input-field text-input">
                                    <span>До:</span>
                                    <input type="number" class="input_to">
                                </div>
                            </div>
                            <div class="dual-slider__ranges">
                                <input data-id="stock" type="range" class="range_from">
                                <input data-id="stock" type="range" class="range_to">
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
                                    <input type="number" class="input_from">
                                </div>
                                <div class="input-field text-input">
                                    <span>До:</span>
                                    <input type="number" class="input_to">
                                </div>
                            </div>
                            <div class="dual-slider__ranges">
                                <input data-id="prices" type="range" class="range_from">
                                <input data-id="prices" type="range" class="range_to">
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
                            <div class="search-img"></div>
                        </div>
                        <div class="search__amount">
                        </div>
                    </div>
                    <div class="view__options">
                        <div id="blocks" class="view__option button_small">
                            
                        </div>
                        <div id="list" class="view__option button_small">
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
                                <div id="name-asc" class="option sort-option">от А до Z</div>
                                <div id="name-desc" class="option sort-option">от Z до A</div>
                                <div id="price-asc" class="option sort-option">по возростанию цены</div>
                                <div id="price-desc" class="option sort-option">по убыванию цены</div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div class="products__list">
                </div>
                <template id="product-card_block__template">
                    <div class="product-card product-card_block">
                        <div class="product__image">
                            <img src="#" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-brand">Бренд:</div>
                                <div class="product__coffee-sort">Сорт:</div>
                                <div class="product__coffee-roast">Обжарка:</div>
                                <div class="product__coffee-stock">В наличии:</div>
                                <div class="product__coffee-weight">Вес:</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>
                                    <div class="button_price__info product__price">
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
                <template id="product-card_list__template">
                    <div class="product-card product-card_list">
                        <div class="product__image">
                            <img src="#" alt="coffee">
                        </div>
                        <div class="product__content">
                            <div class="product__name">
                            </div>
                            <div class="product__info">
                                <div class="product__coffee-brand">Бренд:</div>
                                <div class="product__coffee-sort">Сорт:</div>
                                <div class="product__coffee-roast">Обжарка:</div>
                                <div class="product__coffee-stock">В наличии:</div>
                                <div class="product__coffee-weight">Вес:</div>
                            </div>
                            <div class="product__price-button">
                                <button class="button button_price button_price_checked">
                                    <div class="button_price__text">
                                        В корзину
                                    </div>
                                    <div class="button_price__info product__price">
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </template>
            </section>`;
        this.template.classList.add('shop');
    }

    getPageTemplate(): HTMLElement {
        return this.template;
    }
}
