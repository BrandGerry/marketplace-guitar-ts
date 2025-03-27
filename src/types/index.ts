// TYPE
export type Guitar = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
};

// HEREDACION DE LOS DEMAS TIPOS PORQUE SOLO NECESITABA UN EXTRA QUANTITY
export type CartItem = Guitar & {
  quantity: number;
};

// export type GuitarID = Pick<Guitar, 'id'>;
//OOOO
export type GuitarID = Guitar["id"];

//O CON INTERFACE
// export interface cartItem extends Guitar  {
//   quantity: number;
// };

//UTYLITY TYPES
// export type cartItem = Omit<Guitar, 'id' | 'name'> & {
//   quantity: number;
// };
