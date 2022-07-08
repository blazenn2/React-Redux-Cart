import classes from './CartItem.module.css';
import { cartAction } from '../../store/cart-slice';

import { useDispatch } from 'react-redux';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { title, quantity, total, price } = props.item;

  const incrementHandler = () => {
    fetchHandler("application/json-add", props.cartValue);
    dispatch(cartAction.addItemToCart(props.cartValue));
  }

  const decrementHandler = () => {
    dispatch(cartAction.removeItemFromCart(props.cartValue));
    fetchHandler("application/json-delete", props.cartValue);
  }

  const fetchHandler = async function (headerValue, value) {
    try {
      const res = await fetch(`http://localhost/react/React%20Practice/react-19/cartAPI.php`, {
        method: 'POST',
        headers: {
          'Content-Type': headerValue
        },
        body: JSON.stringify({ value })
      });
      const data = await res.text();
      console.log(data);
    }
    catch (err) {
      console.error(err)
    }
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
