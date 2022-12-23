import CartPageTemplate from '../template/CartPageTemplate';
import HomePageTemplate from '../template/HomePageTemplate';
import Error404PageTemplate from '../template/Error404PageTemplate';
import ShoppingPageTemplate from '../template/ShoppingPageTemplate';

import { RoutesMap } from '../model/Types';

const routes: RoutesMap = {
    error404: new Error404PageTemplate(),
    home: new HomePageTemplate(),
    shop: new ShoppingPageTemplate(),
    cart: new CartPageTemplate(),
};

export default routes;
