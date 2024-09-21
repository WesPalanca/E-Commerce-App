import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

const Sidebar = (props) =>{
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    
    const toggleSidebar = () =>{
        setIsOpen(!isOpen);
    }
    const logout = () =>{
        localStorage.removeItem("token");
        navigate('/');
    }

    return (
        <div className="container">
            <button className={`toggle-sidebar ${isOpen ? 'open' : 'close'}`} onClick={toggleSidebar}>{isOpen ? "x" : ">"} </button>
            {isOpen &&<div className="sidebar">
                <div className="sidebar-content">
                    <Link to={'/Profile'}>Profile</Link>
                    <Link to={'/Cart'}>Cart</Link>
                    <Link to={'/WishList'}>WishList</Link>
                    <Link to={'/sell'}>Sell</Link>
                    <button className="logout-button btn btn-danger" onClick={logout}>Logout</button>

                </div>
            </div>}

        </div>
    

    )
}





export default Sidebar;