import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Layout from "@components/Layout";
import ProfileIcon from "@components/ProfileIcon";
import PostArticle from "@components/PostArticle";
import client from "@libs/server/client";
import { Posts, Role } from "@prisma/client";
import { format } from "date-fns";

interface WithUserPost extends Posts {
  user: {
    role: Role;
    name: string;
  };
}

interface props {
  post: WithUserPost;
}

const PostDetail: NextPage<props> = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <h1 className="w-screen h-screen flex justify-center items-center text-4xl font-bold">
        Loading...
      </h1>
    );
  }

  return (
    <Layout>
      <section className="w-[90%] lg:w-[95%] p-3 space-y-5 bg-purple-100 roundShadow-md">
        <header>
          <div className="flex items-center justify-between px-2 font-md text-gray-500">
            <h2 className="text-purple-500">{post.title}</h2>
            <small className="self-end">
              {`업데이트 시간 : ${format(
                new Date(post.updatedAt),
                "yyyy-MM-dd HH:mm"
              )}`}
            </small>
          </div>
        </header>
        <main className="space-y-3">
          <PostArticle
            header={<ProfileIcon name={post.user.name} role={post.user.role} />}
            main={post.description}
            footer={`작성일 : ${format(
              new Date(post.createdAt),
              "yyyy-MM-dd"
            )}`}
          />
        </main>
      </section>
    </Layout>
  );
};

export default PostDetail;

export const getStaticProps: GetStaticProps = async (ctx) => {
  let post: any;

  const id = ctx.params?.id;

  if (id) {
    post = await client.posts.findUnique({
      where: {
        id: +id,
      },
      include: {
        user: {
          select: {
            role: true,
            name: true,
          },
        },
      },
    });
  } else post = {};

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
