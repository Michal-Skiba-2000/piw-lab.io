function areTagsMatching(searchTags, tags){
    for(let searchTag of searchTags) {
        if(searchTag === '') continue;
        let isTagMatching = false;
        for(let tag of tags) {
            if( searchTag !== '' && tag.includes(searchTag)){
                isTagMatching = true;
                break;
            }
        }
        if( !isTagMatching ){
            return false;
        }
    }
    return true;
}

export { areTagsMatching }
