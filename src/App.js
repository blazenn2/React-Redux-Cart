import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/Notification/Notification';

import { cartAction } from './store/cart-slice';
import { uiActions } from './store/ui-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

let initial = true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector(state => state.ui.cartIsVisible);
  const showNotification = useSelector(state => state.ui.notification);

  useEffect(() => {
    const fetchingItems = async function () {
      try {
        dispatch(uiActions.showNotification({
          status: 'pending',
          title: 'Sending',
          message: 'Sending cart data',
        }));
        const res = await fetch(`http://localhost/react/React%20Practice/react-19/cartAPI.php`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json-get-items"
          }
        });
        if (!res.ok) {
          throw new Error("Failed to connect to cart");
        }
        else {
            dispatch(uiActions.showNotification({
              status: 'success',
              title: 'Success!',
              message: 'Data is successfully sent!',
            }));
        }
        const data = await res.json();
        data.forEach(val => {
          const myObject = {
            id: val.product_id,
            price: parseInt(val.price),
            quantity: parseInt(val.quantity),
            totalPrice: (parseInt(val.quantity) * parseInt(val.price)),
            name: val.title
          };
          dispatch(cartAction.previousItemOfCart(myObject));
        })
      }
      catch (err) {
        dispatch(uiActions.showNotification({
          status: 'error',
          title: "Error!",
          message: 'Sending cart data failed',
        }));
      }
    }

    fetchingItems();
  }, [dispatch]);

  if (initial) {
    initial = false;
    setTimeout(()=> {
      dispatch(uiActions.notShowNotification());
    }, 5000);
  }

  console.log(showNotification);
  return (
    <>
    {showNotification ? <Notification status={showNotification.status} title={showNotification.title} message={showNotification.message} /> : ''}
      <Layout>
        {showCart ? <Cart /> : ''}
        <Products />
      </Layout>
    </>
  );
}

export default App;
