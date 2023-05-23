import { Fragment, useState } from "react";
import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/users/usersSlices";

const user = {
	name: "Tom Cook",
	email: "tom@example.com",
	imageUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const AdminNavbar = () => {
	const dispatch = useDispatch();

	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="bg-white">
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<Link to="/" className="-m-1.5 p-1.5">
						<span className="sr-only">Dev Blog</span>
						<img
							className="h-10 w-auto"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Dev.by_logo.png/1200px-Dev.by_logo.png"
							alt=""
						/>
					</Link>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
						onClick={() => setMobileMenuOpen(true)}
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<Popover.Group className="hidden lg:flex lg:gap-x-12">
					<Link to="/" className="font-semibold leading-6 text-gray-900">
						Home
					</Link>
					<a href="/" className="font-semibold leading-6 text-gray-900">
						Blog
					</a>
					<a href="/" className="font-semibold leading-6 text-gray-900">
						Authors
					</a>
					<Link
						to="/add-category"
						className="font-semibold leading-6 text-gray-900"
					>
						Add Category
					</Link>
					<Link
						to="/categories"
						className="font-semibold leading-6 text-gray-900"
					>
						Category List
					</Link>
				</Popover.Group>
				<div className="hidden lg:flex items-center lg:flex-1 lg:justify-end">
					<Link
						to="/add-post"
						className="flex justify-center rounded-full text-blue-600 border-2 border-blue-600 px-5 py-2 mr-3 font-semibold leading-6 shadow-sm hover:bg-blue-500 hover:text-white hover:border-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
					>
						Create Article
					</Link>
					<Menu as="div" className="relative ml-3">
						<div>
							<Menu.Button className="flex max-w-xs items-center rounded-full border-2 border-blue-600 bg-gray-800 text-sm focus:outline-none ">
								<span className="sr-only">Open user menu</span>
								<img
									className="h-8 w-8 rounded-full"
									src={user.imageUrl}
									alt=""
								/>
							</Menu.Button>
						</div>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<Menu.Item>
									<button
										className="block px-4 py-2 text-sm text-gray-700"
										onClick={() => dispatch(logout())}
									>
										Logout
									</button>
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</nav>
			<Dialog
				as="div"
				className="lg:hidden"
				open={mobileMenuOpen}
				onClose={setMobileMenuOpen}
			>
				<div className="fixed inset-0 z-10" />
				<Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="/" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img
								className="h-8 w-auto"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Dev.by_logo.png/1200px-Dev.by_logo.png"
								alt=""
							/>
						</a>
						<button
							type="button"
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
							onClick={() => setMobileMenuOpen(false)}
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon className="h-6 w-6" aria-hidden="true" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Home
								</a>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Blog
								</a>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Authors
								</a>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Add Category
								</a>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Category List
								</a>
							</div>
							<div className="space-y-2 py-6">
								<div className="flex items-center mb-5">
									<div className="flex-shrink-0">
										<img
											className="h-10 w-10 rounded-full"
											src={user.imageUrl}
											alt=""
										/>
									</div>
									<div className="ml-3">
										<div className="text-base font-medium leading-none text-gray-900">
											{user.name}
										</div>
										<div className="text-sm font-medium leading-none text-gray-400">
											{user.email}
										</div>
									</div>
								</div>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Profile
								</a>
								<a
									href="/"
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
								>
									Settings
								</a>
								<button
									className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
									onClick={() => dispatch(logout())}
								>
									Logout
								</button>
							</div>
						</div>
					</div>
				</Dialog.Panel>
			</Dialog>
		</header>
	);
};

export default AdminNavbar;
