import { useSelector } from "react-redux";
import AdminNavbar from "./admin/AdminNavbar";
import PrivateNavbar from "./private/PrivateNavbar";
import PublicNavbar from "./public/PublicNavbar";

const Navbar = () => {
	const userData = useSelector((state) => state?.user);

	const { userAuth } = userData;

	const isAdmin = userAuth?.isAdmin;

	return (
		<>
			{isAdmin ? (
				<AdminNavbar />
			) : userAuth ? (
				<PrivateNavbar />
			) : (
				<PublicNavbar />
			)}
		</>
	);
};

export default Navbar;
