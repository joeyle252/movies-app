import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
// import MoviesList from './MoviesList';

function NavBar(props) {
  const [keyword, setKeyword] = useState('');
  
  return (
    <div className="navBar">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Khanh's Movies</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Animation</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Comody</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">All Movies</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search movies..." className="mr-sm-2" onChange={(e) => { setKeyword(e.target.value) }} />
            <Button onClick={() => props.setFilterText(keyword)} variant="outline-success">Search</Button>
            <Button onClick={()=>props.sortByPopularity()} variant="outline-success"> The Most Popular </Button>
            <Button onClick={()=>props.sortByVoteAverage()} variant="outline-success"> Sort By Vote Average </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavBar;