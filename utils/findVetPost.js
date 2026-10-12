export const findVetPost = (allposts, id)=>{
    if(id){
        // console.log("condition check")
        let post = allposts.filter(i=> i.id == id)
        return post[0]
    }else{
        return ;
    }
}