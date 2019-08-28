export default interface Car {
    brand: string;
    model: string;
    color: string;
    registerNumber: string;
    year: number;
    price: number;
    _links: {
        self: {
            href: string;
        },
        [key: string]: {
            href: string;
        }
    }
}