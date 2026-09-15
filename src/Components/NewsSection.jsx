import { useState } from "react";
import { Link } from "react-router-dom";
import { news } from "../Data/newsData";

const NewsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 9;

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;

  const currentBlogs = news.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(news.length / blogsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((page) => (page > 1 ? page - 1 : page));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => (page < totalPages ? page + 1 : page));
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* BLOG GRID */}
        <div className="grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="group relative h-[270px] w-full max-w-[350px] overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 h-[64px] bg-[#FFFFFF33] px-4 pb-3 pt-12 backdrop-blur-[12px]">
                <h3 className="max-w-[260px] text-sm font-semibold leading-5 text-slate-800">
                  {blog.title}
                </h3>
                <Link
                  to={`/news/${blog.slug}/`}
                  aria-label={`Read ${blog.title}`}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 text-bold  transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>

     {/* ✅ PAGINATION */}
<div className="mt-12 flex items-center justify-center gap-3">

  {/* PREV */}
  <button
    type="button"
    onClick={goToPreviousPage}
    disabled={currentPage === 1}
    aria-label="Previous page"
    className={`flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-cyan-700 font-bold cursor-pointer ${
      currentPage === 1
        ? "text-blue-400 cursor-pointer hover:text-green-500"
        : "text-black hover:text-green-500 cursor-pointer"
    }`}
  >
    ←
  </button>

  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-400 text-[18px]">
    {currentPage} / {totalPages}
  </span>

  <button
    type="button"
    onClick={goToNextPage}
    disabled={currentPage === totalPages}
    aria-label="Next page"
    className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-100 text-cyan-700 font-bold"
  >
    →
  </button>

</div>

      </div>
    </section>
  );
};

export default NewsSection;