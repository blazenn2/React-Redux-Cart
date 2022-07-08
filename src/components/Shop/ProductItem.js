import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartAction } from '../../store/cart-slice';

import { useDispatch } from 'react-redux';

const ProductItem = (props) => {
  const { title, price, description } = props;

  const dispatch = useDispatch();


  const AddCartHandler = () => {
    dispatch(cartAction.addItemToCart({
      id: props.uniqueKey,
      price: price,
      name: title
    }));
    AddItemToSQL();

  }


  const AddItemToSQL = async function () {
    try {
      const res = await fetch(`http://localhost/react/React%20Practice/react-19/cartAPI.php`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json-add-item"
        },
        body: JSON.stringify({
          id: props.uniqueKey,
          price: price,
          name: title
        })
      });
      const resData = await res.text();
      console.log(resData);
    }
    catch (err) {
      console.error(err);
    }
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={AddCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
