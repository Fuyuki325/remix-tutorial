import { Link } from "@remix-run/react";

const Page = () => {
  return (
    <>
      <div>Demo Page</div>
      <Link to="/" className="text-blue-800">go to index page</Link>
    </>
  );
};

export default Page;
