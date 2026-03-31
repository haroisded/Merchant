import { NavLink } from "react-router"


const Home = () => {
	return (
	<>
	<div>This is the Home</div>

	<NavLink to="/FetchUsers">
	<button>Fetch Users</button>
	</NavLink>


	<NavLink to="/InsertUsers">
	<button >Insert Users</button>
	</NavLink>
	</>
	)
}

export default Home