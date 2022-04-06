import { rest } from "msw";

// mock data
export const posts = [
  {
    userId: 1,
    id: 1,
    title: "first post title",
    body: "first post body",
  },
  {
    userId: 2,
    id: 5,
    title: "second post title",
    body: "second post body",
  },
];

export const comments = [
  {
    userId: 1,
    id: 1,
    content: "first content",
  },
  {
    userId: 2,
    id: 2,
    content: "second content",
  },
  {
    userId: 3,
    id: 3,
    content: "third content",
  },
];

export const handlers = [
  rest.get("http://localhost:4430/posts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),
  rest.get("http://localhost:4430/comments", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(comments));
  }),
  // add more...
];
