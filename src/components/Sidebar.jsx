import { useState } from "react"
import { Link } from "react-router-dom";

const Sidebar = (props) =>{
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleSidebar = () =>{
        setIsOpen(!isOpen);
    }

    return (
        <div className="container">
            <button className={`toggle-sidebar ${isOpen ? 'open' : 'close'}`} onClick={toggleSidebar}>{isOpen ? "x" : ">"} </button>
            {isOpen &&<div className="sidebar">
                <div className="sidebar-content">
                    <Link to={'/Profile'}>Profile</Link>
                    <Link to={'/Cart'}>Cart</Link>
                    <Link to={'/WishList'}>WishList</Link>

                </div>
            </div>}

        </div>
    

    )
}





export default Sidebar;