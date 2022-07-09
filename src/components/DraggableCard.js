import React, { Component } from "react";

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
            isSelected: false
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
        this.headerRef.current.classList.add("grabbing");
        this.setState({style: {...this.state.style, boxShadow: "-5px 5px 12px 1px #5e5e5e"}});
        this.setState({...this.state, isSelected: true});

        // Incase window is slipped off from mouse. Then if mouse key is pressed up, unselect the window. Otherwise we might not be able to bring mouse to the header itself.
        window.addEventListener("mouseup", this.handleMouseUp); // This will call handlMouseUp Two times if header is selected.
        
    }
    handleMouseMove = (e) => {
        let {movementX, movementY} = e;
        if(this.state.isSelected){
            let currentLeft = this.draggableRef.current.style.left;
            currentLeft = parseInt(currentLeft.substr(0, currentLeft.length - 2)); // remove 'px' from end
            
            let currentTop = this.draggableRef.current.style.top;
            currentTop = parseInt(currentTop.substr(0, currentTop.length - 2)); // remove 'px' from end
            

            let newLeft = currentLeft + movementX;
            let newTop = currentTop + movementY;
            let currentWidth = parseInt(this.state.style.width || this.draggableRef.current.offsetWidth);
            let currentHeight = parseInt(this.state.style.height || this.draggableRef.current.offsetHeight);
            
            // console.log(this.props.boundary);
            // console.log(newLeft + " : " + currentWidth + " : " + newTop + " : " + currentHeight);
            // console.log("Div Bottom: " + (newTop + currentHeight))

            let leftAllowed = false;
            let topAllowed = false;

            if((newLeft <= this.props.boundary.left) || (newLeft + currentWidth >= this.props.boundary.right)) {
                // Can't set the left propery.
                console.log("Left Not allowed");
                // Check for top propery
                if((newTop <= 0) || (newTop + 70 >= this.props.boundary.bottom)) {
                    console.log("AND Top Not allowed");
                }
                else {
                    // Top if allowed
                    this.setState({style: {...this.state.style, top: newTop+"px"}});
                    topAllowed = true;
                }
            }
            else {
                leftAllowed = true;
            }

            if((newTop <= 0) || (newTop + 70 >= this.props.boundary.bottom)) {
                console.log("Top Not allowed");
                if((newLeft <= this.props.boundary.left) || (newLeft + currentWidth >= this.props.boundary.right)) {
                    // Can't set the left propery.
                    console.log("AND Left Not allowed");
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
                this.setState({style: {...this.state.style, left: newLeft+"px", top: newTop+"px"}});
            }

            //============ Movement without boundary validation==========
            // this.setState({style: {...this.state.style, left: newLeft+"px", top: newTop+"px"}});
        }
    }

    handleMouseUp = e => {
        console.log("UP...");
        if(this.headerRef.current !== null){
            this.headerRef.current.classList.remove("grabbing");
        }
        this.setState({style: {...this.state.style, boxShadow: "unset"}});
        this.setState({isSelected: false});
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
                        <div className="text-center flex-fill">
                            <b>This is the heading</b>
                        </div>
                    </div>
                    <div className="my-card-body rounded-bottom flex-fill"></div>
                </div>
            </div>
        )
    }
}