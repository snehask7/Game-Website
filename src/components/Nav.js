import React from 'react';

import { Navbar, NavDropdown, Nav } from 'react-bootstrap';

const NavBar = () => {
    
    
    return (        
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Nav className="mr-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>

            </Nav>

        </Navbar>
    )
}

export default NavBar;