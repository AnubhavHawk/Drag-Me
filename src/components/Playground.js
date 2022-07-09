import React from "react";
import DraggableCard from "./DraggableCard";

class Playground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {boundary: {}}
        this.playground = React.createRef();
    }
    cardList = [];
    buttonStyle = {
        height: "50px",
        width: "50px",
        position: "fixed",
        left: "50%",
        bottom: "5%",
        boxShadow: "0 0 10px 1px #858585",
        transform: "translateX(-50%)"
    };
    
    // boundary = this.playground.current.classList

    componentDidMount(){
        this.calculateBoundary(this.playground.current)
        window.addEventListener('resize', () => this.calculateBoundary(this.playground.current)); // Calculate the wrapper size.
    }

    calculateBoundary(playground) {
        if(playground){
            let boundary = {top: playground.offsetTop, bottom: playground.offsetHeight, left: playground.offsetLeft, right: playground.offsetWidth};
            this.setState({boundary})
        }
    }

    render() {
        return (
            <div className="playground" ref={this.playground}>
                <DraggableCard boundary={this.state.boundary} />
                <button className="btn btn-primary font-bold rounded-circle" style={this.buttonStyle}>+</button>   
            </div>
        );
    }
}

export default Playground;