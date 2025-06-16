import { Prisma } from "@prisma/client";
/*
Prisma.UserSelect：Prisma 生成的类型，表示 User 模型的可选字段。
satisfies：确保对象结构符合 UserSelect 类型，同时保留字面量类型。
*/
export const userDataSelect = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;
/*
Prisma.PostInclude：Prisma 生成的关联模型类型。
嵌套 select：控制关联模型的返回字段。
*/
export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export interface PostPage {
  posts: PostData[];
  nextCursor: string | null;
}
