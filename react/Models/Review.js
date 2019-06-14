export default class Review{

    constructor(pro_id, stars, review, r_id, r_img){
        this.profile_id = pro_id;
        this.stars = stars;
        this.review = review;
        this.reviewer_id = r_id;
        this.img = r_img
    }
  }