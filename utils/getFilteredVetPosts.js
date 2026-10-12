export function getFilteredVetPosts(vets) {
    const filteredPosts = [];
  
    for (const vet of vets) {
      if (vet.vet_posts && !vet.banned) { 
        for (const post of vet.vet_posts) {
          if (!post.banned) {  
            filteredPosts.push(post);
          }
        }
      }
    }
  
    return filteredPosts;
  }
  
export function getAllVetPosts(vets) {
    const filteredPosts = [];
  
    for (const vet of vets) {
      if (vet.vet_posts) { // Check if user has a "posts" property
        for (const post of vet.vet_posts) {
          filteredPosts.push(post);
        }
      }
    }
  
    return filteredPosts;
  }
  