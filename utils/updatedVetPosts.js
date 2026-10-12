export function updateVetPosts(vet_posts, vetPostID, meetObject, meetObjectIndex) {
    return vet_posts.map(post => {
      if (post.id === vetPostID) {
        const updatedMeetings = [...post.meeting];
        updatedMeetings[meetObjectIndex] = meetObject;
        return { ...post, meeting: updatedMeetings };
      }
      return post;
    });
  }