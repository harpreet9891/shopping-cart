import React, { useState } from 'react';
import "./style.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardsData from "./CardData";
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Home = () => {
  const [cartData] = useState(CardsData);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // add to cart 
  const send = (e) => {
    dispatch(addToCart(e));
    toast.success("Item added In Your Cart");

    // scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // filter products based on search term
  const filteredProducts = cartData.filter((item) =>
    item.dish.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <section className='iteam_section mt-4 container'>
        {/* Search input */}
        <div className='mb-3 px-4'>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='row mt-2 d-flex justify-content-evenly align-items-center'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((element) => (
              <Card key={element.id} style={{ width: "22rem", border: "none" }} className='hove mb-4'>
                <Card.Img variant='top' className='cd' src={element.imgdata} />

                <div className="card_body">
                  <div className="upper_data d-flex justify-content-between align-items-center">
                    <h4 className='mt-2'>{element.dish}</h4>
                    <span>{element.rating}&nbsp;★</span>
                  </div>

                  <div className="lower_data d-flex justify-content-between ">
                    <h5>{element.address}</h5>
                    <span>₹ {element.price}</span>
                  </div>
                  <div className="extra"></div>

                  <div className="last_data d-flex justify-content-between align-items-center">
                    <Button style={{ width: "100%", background: "#ff3054db", border: "none" }}
                      variant='outline-light'
                      className='mt-2 mb-2'
                      onClick={() => send(element)}
                    >Add to Cart</Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <p className='text-center mt-4'>No products found!</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
