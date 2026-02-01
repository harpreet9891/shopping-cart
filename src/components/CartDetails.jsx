import React, { useEffect, useState } from 'react';
import "./cartStyle.css";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeToCart, removeSingleIteams, emptycartIteam } from '../redux/features/cartSlice';
import toast from 'react-hot-toast';

const CartDetails = () => {
  const { carts } = useSelector(state => state.allCart);
  const dispatch = useDispatch();

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  // Handlers
  const handleIncrement = (item) => dispatch(addToCart(item));

  const handleDecrement = (id) => {
    dispatch(removeToCart(id));
    toast.success("Item Removed From Your Cart");
  }

  const handleSingleDecrement = (item) => dispatch(removeSingleIteams(item));

  const handleEmptyCart = () => {
    dispatch(emptycartIteam());
    toast.success("Your Cart is Empty");
  }

  // Calculate totals
  useEffect(() => {
    const price = carts.reduce((sum, item) => sum + item.price * item.qnty, 0);
    const quantity = carts.reduce((sum, item) => sum + item.qnty, 0);
    setTotalPrice(price);
    setTotalQuantity(quantity);
  }, [carts]);

  return (
    <div className='row justify-content-center m-0'>
      <div className='col-md-10 mt-5 mb-5 cardsdetails'>
        <div className="card">

          {/* Card Header only if cart has items */}
          {carts.length > 0 && (
            <div className="card-header bg-dark p-3 d-flex justify-content-between align-items-center">
              <h5 className='text-white m-0'>
                <i className="fa fa-shopping-cart mr-2"></i>
                Cart Summary ({carts.length})
              </h5>
              <button className='btn btn-danger btn-sm' onClick={handleEmptyCart}>
                <i className='fa fa-trash-alt mr-2'></i>Empty Cart
              </button>
            </div>
          )}

          <div className="card-body p-0">
            {carts.length === 0 ? (
              <div className='cart-empty text-center py-5'>
                <i className='fa fa-shopping-cart fa-3x mb-3'></i>
                <p>Your Cart Is Empty</p>
              </div>
            ) : (
              <table className='table cart-table mb-0 table-responsive-sm'>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th className='text-right'>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <button className='prdct-delete' onClick={() => handleDecrement(item.id)}>
                          <i className='fa fa-trash-alt'></i>
                        </button>
                      </td>
                      <td>
                        <div className='product-img'>
                          <img src={item.imgdata} alt={item.dish} />
                        </div>
                      </td>
                      <td>{item.dish}</td>
                      <td>₹ {item.price}</td>
                      <td>
                        <div className="prdct-qty-container">
                          <button
                            className='prdct-qty-btn'
                            onClick={item.qnty <= 1 ? () => handleDecrement(item.id) : () => handleSingleDecrement(item)}
                          >
                            <i className='fa fa-minus'></i>
                          </button>
                          <input type="text" className='qty-input-box' value={item.qnty} disabled />
                          <button className='prdct-qty-btn' onClick={() => handleIncrement(item)}>
                            <i className='fa fa-plus'></i>
                          </button>
                        </div>
                      </td>
                      <td className='text-right'>₹ {item.qnty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={4}></th>
                    <th>Items: <span className='text-danger'>{totalQuantity}</span></th>
                    <th className='text-right'>Total: <span className='text-danger'>₹ {totalPrice}</span></th>
                  </tr>
                </tfoot>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;