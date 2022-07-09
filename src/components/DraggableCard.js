import React, { Component } from "react";
import east from '../static/img/e-resize.png';
import west from '../static/img/w-resize.png';
import north from '../static/img/n-resize.png';
import south from '../static/img/s-resize.png';
import ne from '../static/img/ne-resize.png';
import nw from '../static/img/nw-resize.png';
import se from '../static/img/se-resize.png';
import sw from '../static/img/sw-resize.png';
import defaultCursor from '../static/img/pointer.png';

export default class DraggableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                height: "400px",
                width: "400px",
                left: "0px",
                top: "0px",
            },
            isSelected: false,
            isResizing: false
        };

        this.draggableRef = React.createRef();
        this.headerRef = React.createRef();
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }
    // handleDrag = e => {
    //     // e.preventDefault();
    //     // console.log(e);
    // }
    // handleDragStart = e => {
    //     // console.log(e);
    //     console.log("Started!!!!!");
    //     this.setState({style: {...this.state.style, boxShadow: "-5px 5px 12px 1px #5e5e5e"}});
    // }
    // handleDragEnd = e => {
    //     let currentStyle = {...this.state.style};
    //     currentStyle.boxShadow = "none";
    //     this.setState({style: currentStyle});
    // }
    // handleDragOver = e => {
    //     e.preventDefault();
    //     e = e || window.event;
    //     console.log("Target: ", e.target.offsetTop, e.target.offsetLeft);
    //     this.setState({style: {...this.state.style, left: e.pageX+"px", top: e.pageY+"px"}});
    //     console.log(e.pageX + " : " + e.pageY);
    // }
    // header = null;


    
    handleMouseDown = e => {
        console.log("Down...");
        this.setState({...this.state, isSelected: true, style: {...this.state.style, boxShadow: "-5px 5px 12px 1px #5e5e5e"}});
        // this.setState({...this.state, isSelected: true, style: {...this.state.style, boxShadow: "-2px 1px 12px 1px #e3e3e3 "}});
        this.headerRef.current.classList.add("grabbing");
        // this.setState({...this.state, isSelected: true});

        // Incase window is slipped off from mouse. Then if mouse key is pressed up, unselect the window. Otherwise we might not be able to bring mouse to the header itself.
        window.addEventListener("mouseup", this.handleMouseUp); // This will call handlMouseUp Two times if header is selected.
        
    }



    handleMouseMove = (e) => {
        let {movementX, movementY} = e;
        let currentLeft = this.draggableRef.current.style.left;
        currentLeft = parseInt(currentLeft.substr(0, currentLeft.length - 2)); // remove 'px' from end
        
        let currentTop = this.draggableRef.current.style.top;
        currentTop = parseInt(currentTop.substr(0, currentTop.length - 2)); // remove 'px' from end
        let currentWidth = parseInt(this.state.style.width || this.draggableRef.current.offsetWidth);
        let currentHeight = parseInt(this.state.style.height || this.draggableRef.current.offsetHeight);

        // Check the mouse position, if it is for resizing.
        let mouseOnTop, mouseOnLeft, mouseOnBottom , mouseOnRight = false;
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        

        // Check on right
        /*
            right: x
            mouse resize: (x-2, x+2);
        */
        if((mouseX >= currentLeft + currentWidth - 5) && (mouseX <= currentLeft + currentWidth + 5)) {
            console.log("Right side");
            mouseOnRight = true;
        }

        // check on left
        /* 
            left: x
            mouse for left allowed: (x-5, x+5)

        */
        if((mouseX >= currentLeft - 5) && (mouseX <= currentLeft + 5)) {
            console.log("Left side");
            mouseOnLeft = true;
        }


        // check on top
        /* 
            top: y
            mouse for top allowed: (y-5, y+5)

        */
        if((mouseY >= currentTop - 5) && (mouseY <= currentTop + 5)) {
            console.log("Top side");
            mouseOnTop = true;
        }

        // check on bottom
        /* 
            bottom: y
            mouse for bottom allowed: (y-5, y+5)

        */
        if((mouseY >= currentTop + currentHeight - 5) && (mouseY <= currentTop + currentHeight + 5)) {
            console.log("Bottom side");
            mouseOnBottom = true;
        }
        
        if(mouseOnLeft || mouseOnRight || mouseOnTop || mouseOnBottom) {
            if(mouseOnRight) {
                this.setState({style: {...this.state.style, cursor: `url(${east}) 15 15, auto`}});
            }
            if(mouseOnLeft) {
                this.setState({style: {...this.state.style, cursor: `url(${west}) 20 15, auto`}});
            }
            if(mouseOnTop) {
                this.setState({style: {...this.state.style, cursor: `url(${north}) 15 20, auto`}});
            }
            if(mouseOnBottom) {
                this.setState({style: {...this.state.style, cursor: `url(${south}) 15 12, auto`}});
            }
            if(mouseOnTop && mouseOnLeft) {
                // check on top-left
                this.setState({style: {...this.state.style, cursor: `url(${nw}) 15 15, auto`}});
            }
            if(mouseOnTop && mouseOnRight) {
                // check on top-right
                this.setState({style: {...this.state.style, cursor: `url(${ne}) 20 15, auto`}});
            }
            if(mouseOnBottom && mouseOnLeft) {
                // check on bottom-left
                this.setState({style: {...this.state.style, cursor: `url(${sw}) 15 15, auto`}});
            }
            if(mouseOnBottom && mouseOnRight) {
                // check on bottom-right
                this.setState({style: {...this.state.style, cursor: `url(${se}) 20 20, auto`}});
            }
        }
        else {
            this.setState({style: {...this.state.style, cursor: `url(${defaultCursor}) 10 10,auto`}});
        }

        // If mouse is on the corners, then don't move the window, but resize it (else).
        if(this.state.isSelected && !(mouseOnLeft || mouseOnRight || mouseOnTop || mouseOnBottom)){
            // Window is selected (not from corners)
            let newLeft = currentLeft + movementX;
            let newTop = currentTop + movementY;

            let leftAllowed = false;
            let topAllowed = false;

            if((newLeft <= this.props.boundary.left) || (newLeft + currentWidth >= this.props.boundary.right)) {
                // X-axis movement is not allowed.
                // Check for top property
                if((newTop <= 0) || (newTop + 70 >= this.props.boundary.bottom)) { // 70 is for the navbar and headers.
                    // Y-axis movement is not allowed.
                }
                else {
                    // Top is allowed
                    this.setState({style: {...this.state.style, top: newTop+"px"}});
                    topAllowed = true;
                }
            }
            else {
                leftAllowed = true;
            }

            if((newTop <= 0) || (newTop + 70 >= this.props.boundary.bottom)) { // 70 is for the navbar and headers.
                // Y-axis movement is not allowed.
                // Check for left property
                if((newLeft <= this.props.boundary.left) || (newLeft + currentWidth >= this.props.boundary.right)) {
                    // X-axis movement is not allowed.
                }
                else {
                    // Left is allowed
                    this.setState({style: {...this.state.style, left: newLeft+"px"}});
                    leftAllowed = true;
                }
            }
            else {
                topAllowed = true
            }
            
            if(topAllowed && leftAllowed) {
                // X-axis as well as Y-axis movements are allowed.
                this.setState({style: {...this.state.style, left: newLeft+"px", top: newTop+"px"}});
            }
        }
        else {
            // Resize the window.
            if(this.state.isSelected) {
                // If window is selected, it is for resizing.
                // this.setState({...this.state, isResizing: true});
                console.log("Resize karega main.....");
                console.log(movementX, movementY);
            }
            else {
                // this.setState({...this.state, isResizing: false});
            }
        }
    }

    handleMouseUp = e => {
        console.log("UP...");
        if(this.headerRef.current !== null){
            this.headerRef.current.classList.remove("grabbing");
        }
        this.setState({...this.state, style: {...this.state.style, boxShadow: "unset"}, isSelected: false});
    }

    // To handle the resizing, when clicked on the body bottom.
    handleLowerResize = e => {
        console.log("Body par click");
        if(this.state.isResizing) {
            console.log("ab toh resize karna hai re....");
        }
    }

    render() {
        return (
            <div className="draggable rounded" style={this.state.style}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp} ref={this.draggableRef}
                >
                <div className="rounded shadow d-flex flex-column" style={{height: "100%"}}>
                    <div className="my-card-header rounded-top text-white d-flex justify-content-between align-items-center m-0" onMouseDown={this.handleMouseDown} ref={this.headerRef} onMouseUp={this.handleMouseUp}>
                        <div>
                            <div className="d-inline-block rounded-circle" style={{height: "10px", width: "10px", margin: "3px", background: "#ff544d"}}></div>
                            <div className="d-inline-block rounded-circle" style={{height: "10px", width: "10px", margin: "3px", background: "#feb429"}}></div>
                            <div className="d-inline-block rounded-circle" style={{height: "10px", width: "10px", margin: "3px", background: "#24c138"}}></div>
                        </div>
                        <div className="text-center flex-fill" onMouseDown={this.handleLowerResize}>
                            <b>This is the heading</b>
                        </div>
                    </div>
                    <div className="my-card-body rounded-bottom flex-fill"></div>
                </div>
            </div>
        )
    }
}