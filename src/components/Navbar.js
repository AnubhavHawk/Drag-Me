import { Component } from "react";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/">
                    <kbd className="bgDark shadow-lg" title="Click on cards to move them here and there">Drag Me</kbd>
                </a>
            </nav>
        )
    }
}
export default Navbar;