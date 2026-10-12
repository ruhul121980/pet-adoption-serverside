export function getFilteredPosts(users) {
    const filteredPosts = [];
  
    for (const user of users) {
      if (user.posts && !user.banned) { // Check if user has a "posts" property
        for (const post of user.posts) {
          if (!post.banned) { // Use !post.banned for "not banned" check
            filteredPosts.push(post);
          }
        }
      }
    }
  
    return filteredPosts;
  }
  