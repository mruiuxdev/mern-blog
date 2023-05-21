import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { categories } from "../../redux/slices/categories/categoriesSlides";

const CategoryList = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(categories());
	}, [dispatch]);

	const categoriesData = useSelector((state) => state?.categories);

	const { loading, categoryList, appErr } = categoriesData;

	return (
		<div className="w-screen main flex content-center mt-20 relative isolate px-6 lg:px-8">
			<div
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80  pointer-events-none"
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
			{loading ? (
				<div className="flex justify-around gap-3 mt-auto">
					<div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
					<div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
					<div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
					<div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
					<div className="w-20 h-8 ml-auto bg-gray-200 rounded-full animate-pulse"></div>
				</div>
			) : appErr ? (
				<div className="flex mx-auto bg-red-300 rounded-lg text-red-600 h-fit w-1/2 px-4 justify-center md:justify-between py-2">
					<div>
						<span>{appErr}</span>
					</div>
				</div>
			) : categoryList?.length > 0 ? (
				<div className="mx-auto">
					<div className="flex flex-col">
						<div className="overflow-x-auto shadow-md sm:rounded-lg">
							<div className="inline-block min-w-full align-middle">
								<div className="overflow-hidden ">
									<table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
										<thead className="bg-gray-100 dark:bg-gray-700">
											<tr>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
												>
													Author
												</th>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
												>
													Category
												</th>
												<th
													scope="col"
													className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
												>
													Created At
												</th>
												<th scope="col" className="p-4">
													<span className="sr-only">Edit</span>
												</th>
											</tr>
										</thead>
										<tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
											{categoryList.map((cat, i) => {
												const {
													_id,
													user: { firstName, lastName },
													title,
													createdAt,
												} = cat;
												return (
													<tr
														className="hover:bg-gray-100 dark:hover:bg-gray-700"
														key={_id}
													>
														<td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
															{firstName} {lastName}
														</td>
														<td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
															{title}
														</td>
														<td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
															<Moment format="DD/MM/YYYY">{createdAt}</Moment>
														</td>
														<td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
															<a
																href="/"
																className="text-blue-600 dark:text-blue-500 hover:underline"
															>
																Edit
															</a>
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						className="w-40 h-40 dark:text-red-600"
					>
						<path
							fill="currentColor"
							d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
						></path>
						<rect
							width="176"
							height="32"
							x="168"
							y="320"
							fill="currentColor"
						></rect>
						<polygon
							fill="currentColor"
							points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
						></polygon>
						<polygon
							fill="currentColor"
							points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
						></polygon>
					</svg>
					<p className="text-3xl text-red-600 font-semibold">
						No categories added yet!!
					</p>
				</div>
			)}
			<div
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-44rem)]  pointer-events-none"
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
				className="absolute inset-x-0 bottom-[calc(100%-44rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-44rem)]  pointer-events-none"
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

export default CategoryList;
