import { rest } from 'msw'

export const handlers = [
  rest.get('http://localhost:4430/posts', (req, res, ctx) => {
    const posts = createPosts()

    return res(ctx.status(200), ctx.json(posts))
  }),
  rest.get('http://localhost:4430/comments', (req, res, ctx) => {
    const comments = createComments()
    return res(ctx.status(200), ctx.json(comments))
  }),
  // add more...
]

// mock data
export function createPosts() {
  return [1, 2, 3].map(value => ({
    userId: value,
    id: value,
    title: `${value} post title`,
    body: `${value} post body`,
  }))
}

export function createComments() {
  return [1, 2, 3].map(value => ({
    userId: value,
    id: value,
    content: `${value} content`,
  }))
}
