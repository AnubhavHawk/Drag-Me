import React from "react";

export default class Dockmenu extends React.Component {
    render() {
        return (
            <>
            <div id="dock-container">
                <div id="dock">
                    <ul>
                        <li>
                            <span>Address Book</span>
                            <div><img src={"http://demos.cssstars.com/Mac-Address-Book-icon.png"} alt="img not found" /></div>
                        </li>
                        <li>
                            <span>App Store</span>
                            <div><img src={"http://demos.cssstars.com/Mac-App-Store-icon.png"} alt="img not found" /></div>
                        </li>
                        <li>
                            <span>Chrome</span>
                            <div><img src={"http://demos.cssstars.com/chrome_ico.png"} alt="img not found" /></div>
                        </li>
                        <li>
                            <span>Firefox</span>
                            <div><img src={"http://demos.cssstars.com/firefox.png"} alt="img not found" /></div>
                        </li>
                    </ul>
                </div>
            </div>
            </>
        )
    }
}