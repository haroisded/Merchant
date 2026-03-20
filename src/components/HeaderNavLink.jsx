import { NavLink } from "react-router";

const HeaderNavLink = ({ to, linkText }) => {
	return (
		<NavLink
			className={({ isActive }) =>
				isActive
					? "text-green-700 mr-4 font-bold link"
					: "text-black mr-4 font-bold link"
			}
			to={to}
		>
			{linkText}
		</NavLink>
	);
};

export default HeaderNavLink;
