import { NextPage } from "next";

interface props {
  header: React.ReactNode | string;
  main: string;
  footer?: string;
  styles?: React.CSSProperties;
}

const PostArticle: NextPage<props> = ({ header, main, footer, styles }) => {
  return (
    <article style={styles} className="bg-gray-50 roundShadow-md">
      {header}
      <div className="w-full">
        <p className="px-5 pb-5 text-gray-600 break-words first-letter:uppercase first-line:ml-3">
          {main}
        </p>
        {footer && (
          <small className="block py-3 px-5 border-t-2 font-md text-gray-500">
            {footer}
          </small>
        )}
      </div>
    </article>
  );
};

export default PostArticle;
