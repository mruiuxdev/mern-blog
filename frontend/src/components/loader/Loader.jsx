import { ShimmerUITitle } from "shimmer-ui-effect";

const Loader = () => {
  return (
    <div className="w-1/3 mx-auto">
      <ShimmerUITitle line={3} gap={10} variant="primary" />
      <br />
      <ShimmerUITitle line={3} gap={10} variant="primary" />
    </div>
  );
};

export default Loader;
