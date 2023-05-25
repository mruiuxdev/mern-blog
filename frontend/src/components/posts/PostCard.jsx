import { ArrowRight, Eye, ThumbsDown, ThumbsUp } from "react-feather";
import Moment from "react-moment";

const PostCard = ({
  title,
  image,
  description,
  createdAt,
  firstName,
  lastName,
  likes,
  dislikes,
  numOfViews,
  category,
}) => {
  return (
    <div className="w-full flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="/" className="relative">
        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 absolute top-2 right-2">
          {category}
        </span>
        <img
          className="rounded-t-lg object-cover w-full h-56"
          src={image}
          alt=""
        />
        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 lg:line-clamp-3 md:line-clamp-2">
            {description}
          </p>
          <div className="flex justify-between">
            <small className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {firstName} {lastName}
            </small>
            <small className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <Moment format="DD MMM YYYY">{createdAt}</Moment>
            </small>
          </div>
        </div>
      </a>
      <div className="px-5 text-white flex justify-between pb-5">
        <div className="flex items-center">
          <ThumbsUp size={20} className="mr-2" />{" "}
          <span className="-mt-1">{likes?.length > 0 && likes?.length}</span>
        </div>
        <div className="flex items-center">
          <ThumbsDown size={20} className="mr-2" />{" "}
          <span className="-mt-1">{dislikes?.length > 0 && likes?.length}</span>
        </div>
        <div className="flex items-center">
          <Eye size={20} className="mr-2" />{" "}
          <span className="-mt-1">{numOfViews && numOfViews}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
