export {};

declare global {
  type CatalogObject = {
    id: number;
    name: string;
    code: string | null;
    price: {
      old_price: number | null;
      current_price: number;
    };
    image: {
      url: string;
    };
    material: number;
  };
}
