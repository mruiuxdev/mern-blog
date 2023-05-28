import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  toggleDislikePost,
  toggleLikePost,
} from "../../redux/slices/posts/postsSlices";
import PostCard from "./PostCard";
import Loader from "../loader/Loader";
import { getCategories } from "../../redux/slices/categories/categoriesSlides";

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state?.posts);
  const categories = useSelector((state) => state?.categories);

  useEffect(() => {
    dispatch(getPosts(""));
  }, [dispatch, posts?.likes, posts?.dislikes]);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="w-screen h-full relative isolate px-6 pt-14 lg:px-8">
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
      <div className="flex">
        <aside className="w-1/4 h-fit bg-white shadow-md rounded-lg sticky top-0 left-0">
          <>
            {categories?.loading ? (
              <ul>
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="p-5">
                    <div
                      role="status"
                      className="space-y-2.5 animate-pulse max-w-lg"
                    >
                      <div className="flex items-center w-full space-x-2">
                        <div className="h-4 bg-gray-300 rounded-full  w-full"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul>
                <li
                  className="bg-indigo-700 rounded-lg p-3 shadow-lg text-white mb-5"
                  key={Math.random() * 1}
                >
                  Category List
                </li>
                <li
                  key={Math.random() * 2}
                  className="mb-5 px-5 cursor-pointer hover:text-indigo-700"
                  onClick={() => dispatch(getPosts(""))}
                >
                  All Categories
                </li>
                {categories?.categoryList?.map((cat) => (
                  <li
                    key={cat?._id}
                    className="mb-5 px-5 cursor-pointer hover:text-indigo-700"
                    onClick={() => dispatch(getPosts(cat?.title))}
                  >
                    {cat?.title}
                  </li>
                ))}
              </ul>
            )}
          </>
        </aside>
        <div className="container m-auto grid lg:grid-cols-3 md:grid-cols-2 gap-4 flex-1 ml-10">
          {posts?.loading ? (
            <>
              {[1, 2, 3, 4, 5].map((i) => (
                <Loader key={i} />
              ))}
            </>
          ) : (
            <>
              {posts?.posts?.length > 0 ? (
                posts?.posts?.map((post) => {
                  const {
                    _id,
                    title,
                    description,
                    image,
                    createdAt,
                    numOfViews,
                    likes,
                    dislikes,
                    category,
                    user: { firstName, lastName },
                  } = post;

                  console.log(likes, dislikes);

                  return (
                    <PostCard
                      key={_id}
                      id={_id}
                      title={title}
                      image={image}
                      description={description}
                      createdAt={createdAt}
                      firstName={firstName}
                      lastName={lastName}
                      numOfViews={numOfViews}
                      likes={likes}
                      dislikes={dislikes}
                      category={category}
                      handleToggleLikes={() => dispatch(toggleLikePost(_id))}
                      handleToggleDislikes={() =>
                        dispatch(toggleDislikePost(_id))
                      }
                    />
                  );
                })
              ) : (
                <div className="rounded-lg bg-red-300 text-red-700 py-2 px-4">
                  No posts added for this category
                </div>
              )}
            </>
          )}
        </div>
      </div>
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
    </div>
  );
};

export default Posts;
