export default interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    roastLevel: string;
    stock: number;
    brand: string;
    sorts: string[];
    country: string;
    weight: string;
    images: string[];
}
