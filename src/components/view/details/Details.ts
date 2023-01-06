import IProduct from '../../model/IProduct';
import { E } from '../../model/Types';

export default class Coffee {
    private contentElement: E | null = null;

    constructor() {
        this.contentElement = document.querySelector('.main') as E;
    }

    draw = (htmlElement: E) => {
        if (this.contentElement) {
            this.contentElement.innerHTML = '';
            this.contentElement.insertAdjacentElement('afterbegin', htmlElement);
        }
    };

    changeBreadcrumb = (link: string) => {
        const breadCrumb = document.querySelector('.shop-item__breadcrumb') as E;
        breadCrumb.innerText = link;
    };

    changePhotos = (link: string[]) => {
        (document.querySelector('.image-main') as HTMLImageElement).src = link[0];
        const photosThumb = document.querySelectorAll<HTMLImageElement>('.image-thumb');
        photosThumb[0].src = link[0];
        photosThumb[1].src = link[1];
    };
    changeInfo = (data: IProduct, sorts: string) => {
        (document.querySelector('.shop-item__name-brand') as HTMLElement).innerText = data.brand + ' ' + data.name;
        (document.querySelector('.shop-item__description') as HTMLElement).innerText = data.description;
        (document.querySelector('.shop-item__brand') as HTMLElement).innerText = 'Бренд: ' + data.brand;
        (document.querySelector('.shop-item__roast') as HTMLElement).innerText = 'Обжарка: ' + data.roastLevel;
        (document.querySelector('.shop-item__sorts') as HTMLElement).innerText = 'Сорт: ' + sorts;
        (document.querySelector('.shop-item__weight') as HTMLElement).innerText = 'Вес: ' + data.weight;
        (document.querySelector('.shop-item__country') as HTMLElement).innerText = 'Страна: ' + data.country;
        (document.querySelector('.item-left__amount') as HTMLElement).innerText = String(data.stock);
        (document.querySelector('.total__price') as HTMLElement).innerText = String(data.price) + '$';
    };
    changePhotoOnClick = () => {
        const photosThumb = document.querySelectorAll<HTMLImageElement>('.image-thumb');
        const mainPhoto = document.querySelector('.image-main') as HTMLImageElement;
        photosThumb.forEach((photo) => {
            photo.addEventListener('click', (e) => {
                const target = e.target as HTMLImageElement;
                mainPhoto.src = target.src;
            });
        });
    };
}
