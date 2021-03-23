const BlogPosts = () => {
  return (
    <div>
      <h1>Blog posts</h1>
      <ul></ul>
    </div>
  );
};

export default BlogPosts;

// export default createFragmentContainer(BlogPosts, {
//   viewer: graphql`
//     fragment BlogPosts_viewer on Viewer {
//       allBlogPosts(first: 10, orderBy: { createdAt: desc }) {
//         edges {
//           node {
//             ...BlogPostPreview_post
//             id
//           }
//         }
//       }
//     }
//   `,
// })
