import React, { Children } from 'react'
import "../styles/LayoutStyles.css"
import { adminMenu, userMenu } from '../Data/data'
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import {message, Badge} from "antd";
import { setUser } from '../redux/features/userSlice'; // your user slice action

/*homepage ko layout se wrap kr diya toh uske andar jo bi 
cheez hogi jse h1, p etc tags wo children bnke apne aap layout ko pass hojayegi
uselocation - lets you access the current URL/location object
Returns 
{
  pathname: "/profile",     // current path
  search: "?id=42",         // query string
  hash: "#section",         // anchor link
  state: undefined,         // optional state passed during navigation
  key: "abc123"             // unique key for this navigation entry
}
The CSS property cursor: pointer; changes the mouse cursor to a hand icon (🖱️👉) when you hover over an element.
*/
const Layout = ({children}) => {
    
    const {user} = useSelector(state=> state.user);
    const location = useLocation();

/* Doctor Menu*/
//used font-awesome
    const doctorMenu = [
        {
            name: "Home",
            path: "/",
            icon : "fa-solid fa-house",
        },
        {
            name: "Appointments",
            path: "/doctor-appointments",
            icon : "fa-solid fa-list",
        },
        {
            name: "Profile",
            path: `/doctor/profile/${user?._id}`,
            icon : "fa-solid fa-user",
        },
    ];
    //const sidebarMenu = user?.isAdmin ? adminMenu : userMenu;
    //initially we had only user and admin but now doctor category is also there
    let sidebarMenu;
    if (user?.isAdmin) {
    sidebarMenu = adminMenu;
    } else if (user?.isDoctor) {
    sidebarMenu = doctorMenu;
    } else {
    sidebarMenu = userMenu;
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleLogout = () => {
        //localStorage.clear();
        localStorage.removeItem("token");
        dispatch(setUser(null)); // clear Redux user state

        message.success("Logout Success");
        navigate("/login");
    }
  return (
    <>
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                        DOC APP
                        <hr />
                    </div>
                    <div className='menu'>
                        {sidebarMenu.map(menu=>{
                            /*const isActive = location.pathname===menu.path;
                            .menu-item applies the styles defined in .menu-item (if any).
                            .active applies the styles from your .active selector:
                            */
                            return (
                                <>
                                    <div className={`menu-item ${location.pathname===menu.path ? "active" : ""}`}> 
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            );
                        })}
                        <div className="menu-item" onClick={handleLogout} > 
                            <i className="fa-solid fa-right-from-bracket"></i>
                            <Link to= "/login">Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <div className='header-content' style={{cursor:"pointer"}}>
                            <Badge count={user && user.notification.length} 
                            onClick = {() =>{
                                navigate("/notification");
                            }}>
                                <i class="fa-solid fa-bell"></i>
                            </Badge>
                            
                            <Link to="/profile">{user?.name}</Link>
                        </div>
                    </div>
                    <div className='Body'>{children}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout
