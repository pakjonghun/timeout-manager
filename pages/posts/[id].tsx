import Input from "@components/Input";
import Layout from "@components/Layout";
import { Answers, Comments, Role, Status, Users } from "@prisma/client";
import Image from "next/image";
import gravatar from "gravatar";
import { getFullDate } from "@libs/client/utils";
import ProfileIcon from "@components/ProfileIcon";
import PostArticle from "@components/PostArticle";

type PostDetailType = {
  id: number;
  updatedAt: Date;
  title: string;
  description: string;
  user: Users;
  comments: Comments[];
  answer: Answers;
};

const data: PostDetailType = {
  id: 1,
  updatedAt: new Date(),
  title: "string",
  description:
    "desLoasdflkasjdfl;fasdfdsafdsafadsfsdfadsfasdfdsafdsafadsfsdfadsfasdfdsafdsafadsfsdfadsfasdfdsafdsafadsfsdfadsfasdfdsafdsafadsfsdfads;dajsfkl;sajdfl;kadsjflaksj;k",
  user: {
    id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "pak",
    phone: "string",
    email: "string",
    avatar: null,
    role: "USER",
    status: "WORKING",
  },
  comments: [
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: "asdfasdfadsfasdfasdfasdfasdfasdfas",
      userId: 1,
      postId: 2,
    },
  ],
  answer: {
    id: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: "asdfasfadsfasdfasfdasfa",
    userId: 2,
    postId: 2,
  },
};

const PostDetail = () => {
  return (
    <Layout>
      <section className="w-[90%] lg:w-[95%] p-3 space-y-5 bg-purple-100 roundShadow-md">
        <header>
          <div className="flex items-center justify-between px-2 font-md text-gray-500">
            <h2 className="text-purple-500">Timeout Post</h2>
            <small>2 posts</small>
          </div>
        </header>
        <main className="space-y-3">
          <PostArticle
            header={<ProfileIcon name={data.user.name} role={data.user.role} />}
            main={data.description}
            footer={getFullDate(data.updatedAt)}
          />

          {data.answer && (
            <PostArticle
              styles={{ backgroundColor: "#effff5" }}
              header={
                <>
                  <h2 className="pt-5 px-5 text-green-400">Answer</h2>
                  <ProfileIcon name={"강매니저"} role={"ADMIN"} />
                </>
              }
              main={data.answer.description}
              footer={getFullDate(data.updatedAt)}
            />
          )}
        </main>
        <footer className="space-y-2 py-3">
          <h2 className="text-purple-500">Comment</h2>
          <form className="relative bg-red-50 ">
            <input type="text" className="w-full normalInput pr-[4rem]" />
            <div className="absolute right-0 inset-y-0 flex items-center py-2 pr-2">
              <button className="px-4 h-full font-bold text-green-500 roundShadow-md bg-green-300 scale-md transition">
                &rarr;
              </button>
            </div>
          </form>

          <ul className="roundShadow-md divide-y-2 bg-gray-50">
            <li className="py-1">
              <ProfileIcon name="min" role="USER" />
              <p className="ml-5 pb-3 -mt-3 break-words font-md text-gray-500 ">
                {data.comments[0].description}
              </p>
            </li>
            <li>
              <ProfileIcon name="min" role="USER" />
              <p className="ml-5 pb-3 -mt-3 break-words font-md text-gray-500 ">
                {data.comments[0].description}
              </p>
            </li>
            <li>
              <ProfileIcon name="min" role="USER" />
              <p className="ml-5 pb-3 -mt-3 break-words font-md text-gray-500 ">
                {data.comments[0].description}
              </p>
            </li>
            <li>
              <ProfileIcon name="min" role="USER" />
              <p className="ml-5 pb-3 -mt-3 break-words font-md text-gray-500 ">
                {data.comments[0].description}
              </p>
            </li>
            <li>
              <ProfileIcon name="min" role="USER" />
              <p className="ml-5 pb-3 -mt-3 break-words font-md text-gray-500 ">
                {data.comments[0].description}
              </p>
            </li>
            <li>
              <ProfileIcon name="min" role="USER" />
              <p className="ml-5 pb-3 -mt-3 break-words font-md text-gray-500 ">
                {data.comments[0].description}
              </p>
            </li>
          </ul>
        </footer>
      </section>
    </Layout>
  );
};

export default PostDetail;
