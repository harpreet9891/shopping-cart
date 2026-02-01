import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Headers = () => {
  const { carts } = useSelector((state) => state.allCart);

  return (
    <>
      <Navbar style={{ height: "60px", background: "black", color: "white" }}>
        <Container>
          <NavLink to="/" className="text-decoration-none text-white mx-2">
            <i
              className="fa fa-store fa-2x"
              aria-hidden="true"
              title="Home"
            ></i><span style={{fontSize: '29px', marginLeft: '8px'}}>Shopkart</span>
          </NavLink>

          <NavLink to="/cart" className="text-decoration-none text-white mx-2">
            <div id='ex4'> 
              <span className='p1 fa-stack fa-2x has-badge' data-count={carts.length}>
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </span>
            </div>
          </NavLink>

        </Container>
      </Navbar>
    </>
  )
}

export default Headers