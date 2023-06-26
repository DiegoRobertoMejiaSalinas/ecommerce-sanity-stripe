import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

interface IContext {
  showCart: boolean;
  setShowCart: (value: boolean) => void;
  cartItems: any[];
  setCartItems: (values: any[]) => void;
  totalPrice: number;
  setTotalPrice:(price: number) => void
  totalQuantities: number;
  setTotalQuantities: (quantities: number) => void
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: any, quantity: number) => void;
  toggleCartItemQuantity: (id: string, value: string) => void;
  onRemove: (productId: string) => void;
}

const contextDefaultValues: IContext = {
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: (values) => {},
  totalPrice: 0,
  totalQuantities: 0,
  setTotalPrice: (price) => {},
  setTotalQuantities: (quantities) => {},
  qty: 1,
  incQty: () => {},
  decQty: () => {},
  onAdd: (product, quantity) => {},
  toggleCartItemQuantity: (id, value) => {},
  onRemove: (productId) => {},
};

const Context = createContext<IContext>(contextDefaultValues);

export const useStateContext = () => useContext(Context);

interface Props {
  children: ReactNode;
}

export const ContextProvider = ({ children }: Props) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: any;
  let index;

  const onAdd = (product: any, quantity: number) => {
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return { ...cartProduct };
      });

      setCartItems(updatedCartItems);
    } else {
      console.log("AQUI");
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const toggleCartItemQuantity = (id: string, value: string) => {
    foundProduct = cartItems.find((product) => product._id === id);
    index = cartItems.findIndex((product) => product._id === id);

    if (value === "inc") {
      let newCartItems = [...cartItems];
      newCartItems[index] = {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      };

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity <= 1) return;

      let newCartItems = [...cartItems];
      newCartItems[index] = {
        ...foundProduct,
        quantity: foundProduct.quantity - 1,
      };

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
    }
  };

  const onRemove = (productId: string) => {
    const foundProduct = cartItems.find((item) => item._id == productId);
    const newCartItems = cartItems.filter((item) => item._id != productId);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.quantity * foundProduct.price
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const value: IContext = {
    showCart,
    setShowCart,
    toggleCartItemQuantity,
    cartItems,
    setCartItems,
    qty,
    totalPrice,
    setTotalPrice,
    totalQuantities,
    setTotalQuantities,
    decQty,
    incQty,
    onAdd,
    onRemove,
  };

  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
};
