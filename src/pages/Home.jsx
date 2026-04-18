import { NavLink } from "react-router"
import { handleSignOut } from "@/utils/userData_queries"


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

	<button onClick={handleSignOut} className="btn btn-error rounded-full mt-3">
					Sign Out
	</button>
	</>
	)
}

export default Home