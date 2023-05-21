import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Lock } from "react-feather";
import { useFormik } from "formik";
import * as Yup from "yup";
import BeatLoader from "react-spinners/BeatLoader";
import { register } from "../../../redux/slices/users/usersSlices";

const formSchema = Yup.object({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string().required("Email is required"),
	password: Yup.string().required("Password is required"),
});

const Register = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		validationSchema: formSchema,
		onSubmit: (values) => {
			dispatch(register(values));
		},
	});

	const { firstName, lastName, email, password } = formik.values;

	const storeData = useSelector((store) => store?.user);

	const { registered, loading, appErr } = storeData;

	useEffect(() => {
		if (registered) return navigate("/profile");
	}, [registered, navigate]);

	return (
		<div className="w-screen main flex content-center items-center relative isolate px-6 lg:px-8">
			<div
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div className="mx-auto w-1/2">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<h1 className="text-4xl mb-10 font-bold capitalize tracking-tight text-gray-900">
						Create an account
					</h1>
					{appErr !== undefined && (
						<div className="tex-red-700 py-3 px-4 bg-red-100 rounded-full">
							{appErr}
						</div>
					)}
					<form onSubmit={formik.handleSubmit}>
						<div className="mt-7">
							<label className="flex items-center text-sm font-medium leading-6 text-gray-900">
								<User className="w-4 h-4 mr-2" /> First Name
							</label>
							<div className="mt-2 relative">
								<input
									type="text"
									value={firstName}
									onChange={formik.handleChange("firstName")}
									onBlur={formik.handleBlur("firstName")}
									className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md focus:shadow-md sm:text-sm sm:leading-6 focus:outline-none"
								/>
								{formik.touched.firstName && formik.errors.firstName && (
									<div className="tex-red-700 text-xs w-fit absolute -bottom-8 right-0 py-1 px-3 bg-red-100 rounded-xl">
										{formik.errors.firstName}
									</div>
								)}
							</div>
						</div>
						<div className="mt-7">
							<label className="flex items-center text-sm font-medium leading-6 text-gray-900">
								<User className="w-4 h-4 mr-2" /> Last Name
							</label>
							<div className="mt-2 relative">
								<input
									type="text"
									value={lastName}
									onChange={formik.handleChange("lastName")}
									onBlur={formik.handleBlur("lastName")}
									className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md sm:text-sm sm:leading-6 focus:outline-none"
								/>
								{formik.touched.lastName && formik.errors.lastName && (
									<div className="tex-red-700 text-xs w-fit absolute -bottom-8 right-0 py-1 px-3 bg-red-100 rounded-xl">
										{formik.errors.lastName}
									</div>
								)}
							</div>
						</div>
						<div className="mt-7">
							<label className="flex items-center text-sm font-medium leading-6 text-gray-900">
								<Mail className="w-4 h-4 mr-2" /> Email
							</label>
							<div className="mt-2 relative">
								<input
									type="email"
									value={email}
									onChange={formik.handleChange("email")}
									onBlur={formik.handleBlur("email")}
									autoComplete="username"
									className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md sm:text-sm sm:leading-6 focus:outline-none"
								/>
								{formik.touched.email && formik.errors.email && (
									<div className="tex-red-700 text-xs w-fit absolute -bottom-8 right-0 py-1 px-3 bg-red-100 rounded-xl">
										{formik.errors.email}
									</div>
								)}
							</div>
						</div>
						<div className="mt-7">
							<label className="flex items-center text-sm font-medium leading-6 text-gray-900">
								<Lock className="w-4 h-4 mr-2" /> Password
							</label>
							<div className="mt-2 relative">
								<input
									type="password"
									value={password}
									onChange={formik.handleChange("password")}
									onBlur={formik.handleBlur("password")}
									autoComplete="current-password"
									className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md sm:text-sm sm:leading-6 focus:outline-none"
								/>
								{formik.touched.password && formik.errors.password && (
									<div className="tex-red-700 text-xs w-fit absolute -bottom-8 right-0 py-1 px-3 bg-red-100 rounded-xl">
										{formik.errors.password}
									</div>
								)}
							</div>
						</div>
						<div className="mt-12">
							{loading ? (
								<button
									disabled
									className="flex w-full justify-center rounded-full bg-blue-600 px-3 py-3 font-semibold leading-6 text-white shadow-sm "
								>
									<BeatLoader color="#fff" size={10} />
								</button>
							) : (
								<button
									type="submit"
									className="flex w-full justify-center rounded-full bg-blue-600 px-3 py-3 font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
								>
									Create Account
								</button>
							)}
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							to="/login"
							className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
						>
							Login here
						</Link>
					</p>
				</div>
			</div>
			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-44rem)] pointer-events-none"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
			<div
				className="absolute inset-x-0 bottom-[calc(100%-44rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-44rem)] pointer-events-none"
				aria-hidden="true"
			>
				<div
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
				/>
			</div>
		</div>
	);
};

export default Register;
