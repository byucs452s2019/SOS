export default class Creator{

  constructor(picture,name,userID,starRating){
    this.picture = picture;
    this.name = name
    this.id = userID;
    this.starRating = starRating;
  }

  toString(){
    let str = this.name + " " + this.userID;
    return str;
  }



}
