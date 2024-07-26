import { useState } from "react"
import { Link } from "react-router-dom";
import cartQuantitySVG from '../assets/cartQuantity.svg';
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
                    <Link to={'/Cart'}>Cart<img src={cartQuantitySVG} alt="" /> <p>{props.amountInCart == 0 ? "" : props.amountInCart}</p></Link>
                    <Link to={'/WishList'}>WishList</Link>

                </div>
            </div>}

        </div>
    

    )
}





export default Sidebar;