import IProduct from '../model/IProduct';
import { QueryMap, I, E } from '../model/Types';
import { parseStr, addParameterToQuery, deleteParameterFromQuery, composeStr } from '../utilities/Utils';

/** TODO
 * количество сортов, брендов
 * Карточки ссылки
 * Корзина
 *
 * карточка товара содержит кнопку добавления в корзину. Состояние кнопки меняется при добавлении/удалении, а также восстанавливается если товар был добавлен на других страницах +5
 *
 * должна быть возможность перехода на страницу с описанием товара. Как это реализовать - решать вам. Например, это может быть кнопка, клик по карточке товара и т.д. +5
 *
 * в случае, если товаров не нашлось, информация об этом дополнительно выводится в блоке товаров
 *
 * Например, при выборе определенной категории товара, в других фильтрах должно пересчитываться количество найденных товаров с указанием сколько найдено при такой конфигурации фильтров, а также сколько доступно без учета всех применённых фильтров. В случае с dual-slider должен меняться их состояние-диапазон.
 *  */

export default class Shop {
    private contentElement: E | null = null;

    getContentElement = () => {
        return this.contentElement;
    };

    draw = (htmlElement: E, filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        if (!this.contentElement) {
            this.contentElement = htmlElement;
            this.buildNewContent(this.contentElement, filteredProducts, products, queries);
        } else {
            this.updateOldContent(this.contentElement, filteredProducts, queries);
        }
    };

    buildNewContent = (htmlElement: E, filteredProducts: IProduct[], products: IProduct[], queries: QueryMap) => {
        console.log('============== NEW TEMPLATE ==============');
        const productCardTemplate: HTMLTemplateElement = this.defineProductCardTemplate(htmlElement, queries.view);

        this.addPresetButtonHandlers(htmlElement);
        this.checkSorts(htmlElement, queries.sorts);

        this.checkBrand(htmlElement, products, queries.brands);

        this.checkRoastLevels(htmlElement, queries.roast);

        this.buildSlider(
            '.coffee-stock__dual-slider',
            htmlElement,
            products,
            (product) => product.stock,
            queries.stock
        );
        this.buildSlider(
            '.coffee-prices__dual-slider',
            htmlElement,
            products,
            (product) => product.price,
            queries.prices
        );

        this.checkSearchText(htmlElement, queries.search, filteredProducts.length);
        this.checkView(htmlElement);
        this.checkOrder(htmlElement, queries.order);
        for (const filteredProduct of filteredProducts) {
            htmlElement
                .querySelector('.products__list')
                ?.append(this.buildProductCard(productCardTemplate, filteredProduct));
        }
        const contentContainer = document.querySelector('.main') as E;
        contentContainer.innerHTML = '';
        contentContainer.append(htmlElement);
    };

    updateOldContent = (htmlElement: E, filteredProducts: IProduct[], queries: QueryMap) => {
        console.log('============== OLD TEMPLATE ==============');
        const productCardTemplate: HTMLTemplateElement = this.defineProductCardTemplate(htmlElement, queries.view);
        const productsListContainer = htmlElement.querySelector('.products__list') as E;
        productsListContainer.innerHTML = '';
        const searchAmount = htmlElement.querySelector('.search__amount') as E;
        searchAmount.innerHTML = 'Найдено ' + filteredProducts.length;
        for (const filteredProduct of filteredProducts) {
            productsListContainer?.append(this.buildProductCard(productCardTemplate, filteredProduct));
        }
    };

    private defineBrandMap = (products: IProduct[]) => {
        const brandMap = new Map();
        for (const product of products) {
            const brand = document.createElement('div') as E;
            brand.classList.add('coffee-brand');
            brand.classList.add('checkmark');
            brand.innerHTML = product.brand;
            brandMap.set(product.brand, brand);
        }
        return brandMap;
    };

    private checkBrand = (htmlElement: E, products: IProduct[], brands: string[]) => {
        const brandMap = this.defineBrandMap(products);
        const brandsContainer = htmlElement?.querySelector('.coffee-brands__content') as E;
        if (brands) {
            brands.forEach((brand) => {
                const checkedBrand = brandMap.get(parseStr(brand)) as E;
                checkedBrand.classList.add('checkmark_checked');
                brandMap.set(parseStr(brand), checkedBrand);
            });
        }
        brandMap.forEach((brand) => brandsContainer.append(brand));
        brandsContainer.addEventListener('click', (e) => {
            const target = e.target as E;
            if (!target.classList.contains('checkmark_checked')) {
                target.classList.add('checkmark_checked');
                window.location.hash = addParameterToQuery('brands', composeStr(target.innerHTML));
            } else {
                target.classList.remove('checkmark_checked');
                window.location.hash = deleteParameterFromQuery('brands', composeStr(target.innerHTML));
            }
        });
    };

    private defineProductCardTemplate = (htmlElement: E, view: string[]) => {
        if (!view || view[0] === 'blocks') {
            htmlElement.querySelector('.products__list')?.classList.add('products__list_blocks');
            htmlElement.querySelector('#blocks')?.classList.add('view__option_checked');
            return htmlElement.querySelector('#product-card_block__template') as HTMLTemplateElement;
        }
        htmlElement.querySelector('#list')?.classList.add('view__option_checked');
        return htmlElement.querySelector('#product-card_list__template') as HTMLTemplateElement;
    };

    private checkSorts = (htmlElement: E, sorts: string[]) => {
        if (sorts) {
            sorts.forEach((sort) =>
                htmlElement.querySelector(`#${sort.toLowerCase()}`)?.classList.add('checkmark_checked')
            );
        }
        htmlElement.querySelector('.coffee-sorts__content')?.addEventListener('click', (e) => {
            const target = e.target as E;
            if (!target.classList.contains('checkmark_checked')) {
                target.classList.add('checkmark_checked');
                window.location.hash = addParameterToQuery('sorts', target.id);
            } else {
                target.classList.remove('checkmark_checked');
                window.location.hash = deleteParameterFromQuery('sorts', target.id);
            }
        });
    };

    private checkRoastLevels = (htmlElement: E, roast: string[]) => {
        if (roast) {
            roast.forEach((roast) => {
                htmlElement.querySelector(`#${roast.toLowerCase()}`)?.classList.add('coffee-roast-level_checked');
            });
        }
        htmlElement.querySelector('.coffee-roast-levels__content')?.addEventListener('click', (e) => {
            const target = e.target as E;
            const closest = target.closest('.coffee-roast-level') as E;
            if (!closest.classList.contains('coffee-roast-level_checked')) {
                closest.classList.add('coffee-roast-level_checked');
                window.location.hash = addParameterToQuery('roast', closest.id);
            } else {
                closest.classList.remove('coffee-roast-level_checked');
                window.location.hash = deleteParameterFromQuery('roast', closest.id);
            }
        });
    };

    private checkSearchText = (htmlElement: E, search: string[], searchResult: number) => {
        const input = htmlElement.querySelector('.search__input input') as I;
        const searchAmount = htmlElement.querySelector('.search__amount') as E;
        if (search) {
            input.value = search[0];
            searchAmount.innerHTML = 'Найдено ' + searchResult;
        }
        input.addEventListener('input', () => {
            const composedStr = composeStr(input.value);
            if (input.value.length === 0) {
                console.log(deleteParameterFromQuery('search', ''));
                window.location.hash = deleteParameterFromQuery('search', '');
            } else {
                const hash = addParameterToQuery(
                    'search',
                    composedStr,
                    deleteParameterFromQuery('search', composedStr.slice(0, -1))
                );
                window.location.hash = hash;
            }
        });
    };

    private checkView = (htmlElement: E) => {
        htmlElement.querySelector('.view__options')?.addEventListener('click', (e) => {
            const target = e.target as E;
            const closest = target.closest('.view__option') as E;

            if (!closest.classList.contains('view__option_checked')) {
                htmlElement
                    ?.querySelectorAll('.view__option')
                    .forEach((el) => el.classList.remove('view__option_checked'));
                closest.classList.add('view__option_checked');

                if (closest.id === 'blocks') {
                    htmlElement?.querySelector('.products__list')?.classList.add('products__list_blocks');
                    htmlElement?.querySelectorAll('.product-card').forEach((el) => {
                        el.classList.replace('product-card_list', 'product-card_block');
                    });

                    window.location.hash = addParameterToQuery(
                        'view',
                        closest.id,
                        deleteParameterFromQuery('view', 'list')
                    );
                } else {
                    htmlElement?.querySelector('.products__list')?.classList.remove('products__list_blocks');
                    htmlElement?.querySelectorAll('.product-card').forEach((el) => {
                        el.classList.replace('product-card_block', 'product-card_list');
                    });

                    window.location.hash = addParameterToQuery(
                        'view',
                        closest.id,
                        deleteParameterFromQuery('view', 'blocks')
                    );
                }
            }
        });
    };

    private checkOrder = (htmlElement: E, order: string[]) => {
        if (order) {
            (htmlElement.querySelector(`#${order[0]}`) as E).classList.add('option__checked');
        }
        htmlElement.querySelector('.select-box__label')?.addEventListener('click', (e) => {
            const target = e.target as E;
            const closest = target.closest('.select-box__label') as E;
            const parent = closest.parentElement as E;
            if (!parent.classList.contains('select-box_active')) {
                parent.classList.add('select-box_active');
            } else {
                parent.classList.remove('select-box_active');
            }
        });
        htmlElement.querySelector('.select-box__options')?.addEventListener('click', (e) => {
            const target = e.target as E;
            if (target.classList.contains('sort-option') && !target.classList.contains('option__checked')) {
                const prevOption = htmlElement.querySelector('.option__checked') as E;
                if (prevOption) prevOption.classList.remove('option__checked');
                target.classList.add('option__checked');
                window.location.hash = addParameterToQuery(
                    'order',
                    target.id,
                    prevOption ? deleteParameterFromQuery('order', prevOption.id) : undefined
                );
            }
        });
    };

    private buildProductCard = (productCardTemplate: HTMLTemplateElement, filteredProduct: IProduct) => {
        const productCard = <E>productCardTemplate.content.cloneNode(true);
        (productCard.querySelector('.product__image img') as HTMLImageElement).src = filteredProduct.images[0];
        (productCard.querySelector('.product__name') as E).innerHTML = filteredProduct.name;
        (productCard.querySelector('.product__coffee-brand') as E).innerHTML = 'Бренд: ' + filteredProduct.brand;
        (productCard.querySelector('.product__coffee-sort') as E).innerHTML =
            'Сорты: ' + filteredProduct.sorts.join(', ');
        (productCard.querySelector('.product__coffee-roast') as E).innerHTML = 'Обжарка: ' + filteredProduct.roastLevel;
        (productCard.querySelector('.product__coffee-stock') as E).innerHTML =
            'В наличии: ' + filteredProduct.stock.toString() + ' шт.';
        (productCard.querySelector('.product__coffee-weight') as E).innerHTML = 'Вес: ' + filteredProduct.weight;
        (productCard.querySelector('.product__price') as E).innerHTML = filteredProduct.price + '$';
        return productCard;
    };

    private buildSlider = (
        selector: string,
        htmlElement: E,
        products: IProduct[],
        callBack: (product: IProduct) => number,
        queryParam: string[]
    ) => {
        let min = Math.min(...products.map(callBack));
        let max = Math.max(...products.map(callBack));

        if (Number(min) === min && min % 1 !== 0) {
            min = Math.floor(min);
        }
        if (Number(max) === max && max % 1 !== 0) {
            max = Math.ceil(max);
        }

        const fromSlider = htmlElement.querySelector(`${selector} .range_from`) as I;
        const toSlider = htmlElement.querySelector(`${selector} .range_to`) as I;
        const fromInput = htmlElement.querySelector(`${selector} .input_from`) as I;
        const toInput = htmlElement.querySelector(`${selector} .input_to`) as I;

        let valueFrom: number;
        let valueTo: number;

        if (queryParam) {
            valueFrom = +queryParam[0];
            valueTo = +queryParam[1];
        } else {
            valueFrom = min;
            valueTo = max;
        }

        fromSlider.min = `${min}`;
        fromSlider.max = `${max}`;
        fromSlider.value = `${valueFrom}`;

        toSlider.min = `${min}`;
        toSlider.max = `${max}`;
        toSlider.value = `${valueTo}`;

        fromInput.min = `${min}`;
        fromInput.max = `${max}`;
        fromInput.value = `${valueFrom}`;

        toInput.min = `${min}`;
        toInput.max = `${max}`;
        toInput.value = `${valueTo}`;

        this.fillSlider(fromSlider, toSlider, toSlider);
        this.setToggleAccessible(toSlider);

        fromSlider.addEventListener('input', () => this.controlFromSlider(fromSlider, toSlider, fromInput));
        toSlider.addEventListener('input', () => this.controlToSlider(fromSlider, toSlider, toInput));
        fromInput.addEventListener('input', () => this.controlFromInput(fromSlider, fromInput, toInput, toSlider));
        toInput.addEventListener('input', () => this.controlToInput(toSlider, fromInput, toInput, toSlider));
        fromInput.addEventListener('blur', () => (fromInput.value = fromSlider.value));
        toInput.addEventListener('blur', () => (toInput.value = toSlider.value));
    };

    private controlFromInput = (fromSlider: I, fromInput: I, toInput: I, controlSlider: I) => {
        const [from, to] = this.getParsed(fromInput, toInput);
        this.fillSlider(fromInput, toInput, controlSlider);
        if (from > to) {
            fromSlider.value = `${to}`;
            fromInput.value = `${to}`;
        } else {
            if (Number.isNaN(from)) fromSlider.value = `${fromSlider.min}`;
            else fromSlider.value = `${from}`;
        }
        window.location.hash = addParameterToQuery(`${fromSlider.dataset.id}`, [fromSlider.value, `${to}`]);
    };

    private controlToInput = (toSlider: I, fromInput: I, toInput: I, controlSlider: I) => {
        const [from, to] = this.getParsed(fromInput, toInput);
        this.fillSlider(fromInput, toInput, controlSlider);
        this.setToggleAccessible(toInput, toSlider);
        if (from <= to) {
            toSlider.value = `${to}`;
            toInput.value = `${to}`;
        } else {
            if (Number.isNaN(to)) toSlider.value = `${toSlider.min}`;
            else toSlider.value = `${from}`;
        }
        window.location.hash = addParameterToQuery(`${toSlider.dataset.id}`, [`${from}`, toSlider.value]);
    };

    private controlFromSlider = (fromSlider: I, toSlider: I, fromInput: I) => {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        this.fillSlider(fromSlider, toSlider, toSlider);
        if (from > to) {
            fromSlider.value = `${to}`;
            fromInput.value = `${to}`;
        } else {
            fromInput.value = `${from}`;
        }
        window.location.hash = addParameterToQuery(`${fromSlider.dataset.id}`, [fromSlider.value, toSlider.value]);
    };

    private controlToSlider = (fromSlider: I, toSlider: I, toInput: I) => {
        const [from, to] = this.getParsed(fromSlider, toSlider);
        this.fillSlider(fromSlider, toSlider, toSlider);
        this.setToggleAccessible(toSlider);
        if (from <= to) {
            toSlider.value = `${to}`;
            toInput.value = `${to}`;
        } else {
            toInput.value = `${from}`;
            toSlider.value = `${from}`;
        }
        window.location.hash = addParameterToQuery(`${toSlider.dataset.id}`, [fromSlider.value, toSlider.value]);
    };

    private getParsed = (currentFrom: I, currentTo: I) => {
        const from = parseFloat(currentFrom.value);
        const to = parseFloat(currentTo.value);
        return [from, to];
    };

    private fillSlider = (from: I, to: I, controlSlider: I) => {
        const rangeDistance = +to.max - +to.min;
        const fromPosition = +from.value - +to.min;
        const toPosition = +to.value - +to.min;

        controlSlider.style.background = `linear-gradient(
        to right,
        #ece6e0 0%,
        #ece6e0 ${(fromPosition / rangeDistance) * 100}%,
        #b17a49 ${(fromPosition / rangeDistance) * 100}%,
        #b17a49 ${(toPosition / rangeDistance) * 100}%, 
        #ece6e0 ${(toPosition / rangeDistance) * 100}%, 
        #ece6e0 100%)`;
    };

    private setToggleAccessible = (currentTarget: I, toSlider?: I) => {
        if (!toSlider) {
            toSlider = currentTarget;
        }
        if (Number(currentTarget.value) <= 0) {
            toSlider.style.zIndex = `${2}`;
        } else {
            toSlider.style.zIndex = `${0}`;
        }
    };

    private addPresetButtonHandlers(htmlElement: E) {
        const saveButton = htmlElement.querySelector('.filters__save') as E;
        htmlElement.querySelector('.filters__reset')?.addEventListener('click', () => {
            this.contentElement = null;
            window.location.hash = '#shop';
        });

        saveButton.addEventListener('click', () => {
            if (window.location.hash !== '#shop') {
                saveButton.setAttribute('content', 'Фильтр сохранён');
                navigator.clipboard.writeText(window.location.href);
                window.localStorage.setItem('saved-filter', window.location.hash);
            } else {
                saveButton.setAttribute('content', 'Фильтр не применен');
            }
            setTimeout(() => {
                saveButton.setAttribute('content', 'Сохранить фильтр');
            }, 1000);
        });

        htmlElement.querySelector('.filters__restore')?.addEventListener('click', () => {
            const savedFilter = window.localStorage.getItem('saved-filter');
            if (savedFilter) {
                this.contentElement = null;
                window.location.hash = savedFilter;
            }
        });
    }
}
