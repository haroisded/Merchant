import { NavLink } from "react-router";

const Links = ({ to, children }) => {
	return ( <NavLink to={to}> {children} </NavLink> )
}

export default Links