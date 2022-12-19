import CartPageTemplate from '../template/CartPageTemplate';
import HomePageTemplate from '../template/HomePageTemplate';
import Error404PageTemplate from '../template/Error404PageTemplate';
import ShopPageTemplate from '../template/ShopPageTemplate';
import ITemplate from '../model/ITemplate';

const routes: { [key: string]: ITemplate } = {
    error404: new Error404PageTemplate(),
    home: new HomePageTemplate(),
    shop: new ShopPageTemplate(),
    cart: new CartPageTemplate(),
};

export default routes;
