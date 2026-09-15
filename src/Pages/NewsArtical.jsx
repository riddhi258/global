import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {news } from "../Data/newsData";
import CommentSection from "../Components/CommentSection";
import { Helmet } from "react-helmet-async";

const NewsArticle = () => {
  const { slug } = useParams();
  const [content, setContent] = useState("");

  const article = news.find((item) => item.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (article) {
      let isMounted = true;

      // Use BASE_URL so this also works when deployed below the domain root.
      const baseUrl = import.meta.env.BASE_URL || "/";
      const filePath = `${baseUrl.replace(/\/$/, "")}/content/news/${encodeURIComponent(slug)}.md`;

      fetch(filePath)
        .then((res) => {
          if (!res.ok) throw new Error("File not found");
          return res.text();
        })
        .then((text) => {
          if (isMounted) {
            // A hosting fallback page means the Markdown file was not found.
            const trimmedText = text.trim().toLowerCase();
            if (trimmedText.startsWith("<!doctype html") || trimmedText.startsWith("<html")) {
              throw new Error(`Markdown file not found at ${filePath}`);
            }
            setContent(text);
          }
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setContent(
            "# Content Not Found\nPlease check that the file exists in `public/content/blogs/`."
          );
        });

      return () => {
        isMounted = false;
      };
    }
  }, [slug, article]);

  if (!article)
    return (
      <div className="py-20 text-center font-bold">
        Metadata not found.
      </div>
    );

  return (
    <>
     <Helmet prioritizeSeoTags>
  <title>{article.metaTitle || article.title}</title>

  <meta
    name="description"
    content={article.metaDescription || article.title}
  />

  <link
    rel="canonical"
    href={`https://www.growmore.one/news/${slug}/`}
    key="canonical"
  />

  <meta property="og:type" content="article" />

  <meta
    property="og:title"
    content={article.metaTitle || article.title}
  />

  <meta
    property="og:description"
    content={article.metaDescription || article.title}
  />

  <meta
    property="og:image"
    content={article.image}
  />

  <meta
    property="og:url"
    content={`https://www.growmore.one/news/${slug}/`}
    key="og-url"
  />

  <meta name="robots" content="index, follow" />
</Helmet>
    <div className="min-h-screen bg-white font-jakarta text-[#042325]">
      
      {/* HEADER */}
      <section className="bg-[#28535B] py-14 text-white">
        <div className="max-w-5xl mx-auto px-6">

          <h1 className="text-[28px] md:text-[32px] font-semibold leading-snug">
            {article.title}
          </h1>
           
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-12 max-w-5xl mx-auto px-6">
        
        {/* IMAGE */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full rounded-4xl mb-8 object-cover max-h-[640px]"
        />

        {/* MARKDOWN CONTENT */}
       <div>
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h2: ({ ...props }) => (
        <h2
          className="text-[#28535B] text-[20px] font-semibold mt-8 mb-3"
          {...props}
        />
      ),

      p: ({ ...props }) => (
        <p
          className="text-[15px] leading-[1.7] text-[#333] mb-4"
          {...props}
        />
      ),

      ul: ({ ...props }) => (
        <ul className="pl-5 mb-4 list-disc" {...props} />
      ),

      li: ({ ...props }) => (
        <li className="mb-2 marker:text-[#333333]" {...props} />
      ),

      strong: ({ ...props }) => (
        <strong
          className="font-semibold text-[#042325]"
          {...props}
        />
      ),

      a: ({ ...props }) => (
        <a
          className="text-[#2ED09B] underline"
          target="_blank"
          
          {...props}
        />
      ),

      // ✅ TABLE SUPPORT STARTS HERE

      table: ({ ...props }) => (
        <div className="overflow-x-auto my-6 border border-gray-300 rounded-lg">
          <table
            className="w-full text-sm border-collapse"
            {...props}
          />
        </div>
      ),

      thead: ({ ...props }) => (
        <thead className="bg-gray-200" {...props} />
      ),

      th: ({ ...props }) => (
        <th
          className="border border-gray-300 px-4 py-2 text-left font-semibold text-[#333]"
          {...props}
        />
      ),

      td: ({ ...props }) => (
        <td
          className="border border-gray-300 px-4 py-2 text-[#333]"
          {...props}
        />
      ),

      tr: ({ ...props }) => (
        <tr className="hover:bg-gray-50 transition" {...props} />
      ),

      // ✅ TABLE SUPPORT ENDS HERE
    }}
  >
    {content}
  </ReactMarkdown>
</div>
        {/* CONTACT BAR */}
      <div className="w-full bg-[#2ED09B]  rounded-lg p-5 shadow-sm my-8">
                <div className="flex flex-col md:flex-row justify-start items-center gap-2 md:gap-4  pl-3 text-black font-semibold text-center text-[15px] sm:text-[17px]">
                  <div className="flex items-center">
                    <span>Email: </span>
                    <a
                      href="mailto:info@growmore.one"
                      className="ml-1 text-blue-500 transition-colors"
                    >
                      study@growmore.one
                    </a>
                  </div>

                  <span className="hidden md:inline text-black">|</span>

                  <div className="flex items-center">
                    <span>WhatsApp: </span>
                    <a
                      href="https://wa.me/61434202021"
                      className="ml-1 text-blue-500 "
                    >
                      (+61) 43450 5002
                    </a>
                  </div>

                  <span className="hidden md:inline text-black">|</span>

                  <div className="flex items-center">
                    <span>Phone: </span>
                    <a
                      href="tel:+61387643334"
                      className="ml-1 text-black "
                    >
                     (+91) 9081899668
                    </a>
                  </div>
                </div>
              </div>
       <CommentSection/>
      </section>
    </div>
    </>
  );
};

export default NewsArticle;