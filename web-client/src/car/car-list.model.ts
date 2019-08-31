export default interface Car {
    brand: string;
    model: string;
    color: string;
    registerNumber: string;
    year: number | string;
    price: number | string;
}

export interface CarDTO extends Car {
    _links: {
        self: {
            href: string;
        },
        [key: string]: {
            href: string;
        }
    }
}