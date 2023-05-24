import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, List, Book, Image } from "react-feather";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import BeatLoader from "react-spinners/BeatLoader";
import { addPost } from "../../redux/slices/posts/postsSlices";
import { getCategories } from "../../redux/slices/categories/categoriesSlides";

const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
});

const AddPost = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      image: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(addPost(values));
    },
  });

  const { title, category, description } = formik.values;

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const storeData = useSelector((store) => {
    return {
      posts: store?.posts,
      categories: store?.categories,
    };
  });

  const { appErr, loading } = storeData?.posts;
  const categories = storeData?.categories;

  // useEffect(() => {
  // 	if (registered) return navigate("/profile");
  // }, [registered, navigate]);

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
            Add new post
          </h1>
          {appErr !== undefined && (
            <div className="tex-red-700 py-3 px-4 bg-red-100 rounded-full">
              {appErr}
            </div>
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-7">
              <label className="flex items-center text-sm font-medium leading-6 text-gray-900">
                <User className="w-4 h-4 mr-2" /> Title
              </label>
              <div className="mt-2 relative">
                <input
                  type="text"
                  value={title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                  className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md focus:shadow-md sm:text-sm sm:leading-6 focus:outline-none"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="tex-red-700 text-xs w-fit absolute -bottom-8 right-0 py-1 px-3 bg-red-100 rounded-xl">
                    {formik.errors.title}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-7">
              <label className="flex items-center text-sm font-medium leading-6 text-gray-900">
                <Book className="w-4 h-4 mr-2" /> Category
              </label>
              <div className="mt-2 relative">
                {!categories?.loading ? (
                  <select
                    value={category}
                    onChange={formik.handleChange("category")}
                    onBlur={formik.handleBlur("category")}
                    className="block w-full rounded-full border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md focus:shadow-md sm:text-sm sm:leading-6 focus:outline-none"
                  >
                    <option value="All" key={0}>
                      All
                    </option>
                    {categories?.categoryList?.map((list) => {
                      const { title, _id } = list;

                      return (
                        <option value={title} key={_id}>
                          {title}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <div className="block w-full rounded-full border-0 py-3 px-4 bg-gray-100 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                    Categories are loading
                  </div>
                )}
              </div>
            </div>
            <div className="mt-7">
              <label className="flex items-center text-sm font-medium leading-6 text-gray-900">
                <List className="w-4 h-4 mr-2" /> Description
              </label>
              <div className="mt-2 relative">
                <textarea
                  rows={5}
                  value={description}
                  onChange={formik.handleChange("description")}
                  onBlur={formik.handleBlur("description")}
                  className="block w-full rounded-lg border-0 py-3 bg-white px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:shadow-md focus:shadow-md sm:text-sm sm:leading-6 focus:outline-none"
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <div className="tex-red-700 text-xs w-fit absolute -bottom-8 right-0 py-1 px-3 bg-red-100 rounded-xl">
                    {formik.errors.description}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-7">
              <label className="flex items-center text-sm font-medium leading-6 text-gray-900">
                <Image className="w-4 h-4 mr-2" /> Poster
              </label>
              <div className="mt-2 relative">
                <Dropzone
                  onDrop={(acceptedFiles) => {
                    formik.setFieldValue("image", acceptedFiles[0]);
                  }}
                  accept="image/jpeg, image/png"
                  onBlur={formik.handleBlur("images")}
                >
                  {({ getRootProps, getInputProps }) => {
                    return (
                      <div className="container">
                        <div
                          {...getRootProps({
                            className: "dropzone",
                            onDrop: (e) => e.stopPropagation(),
                          })}
                        >
                          <input {...getInputProps()} />
                          <div className="flex-col items-center bg-white justify-center text-center pt-5 pb-6 block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                            <svg
                              className="w-10 mx-auto h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              PNG, JPG
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }}
                </Dropzone>
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
                  Add Post
                </button>
              )}
            </div>
          </form>
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

export default AddPost;
