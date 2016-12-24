import React from 'react'
import { Navbar, Nav, NavDropdown, NavItem, MenuItem, Col } from 'react-bootstrap';


class HeaderView extends React.Component {
    render() {
        var self = this;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">OldSpeak</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {this.props.navigation ? <Navbar.Collapse>
                    <Nav>
                        <NavItem href="/#/essays">Essays</NavItem>
                        <NavItem href="/#/drafts">Drafts</NavItem>
                        <NavItem href="/#/roster">Roster</NavItem>
                        <NavItem href="/#/logout">Logout</NavItem>
                    </Nav>

                </Navbar.Collapse> : null}
            </Navbar>
        )
    }
}

export default HeaderView
