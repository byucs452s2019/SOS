//picture
//Title
//Description
//userID

export default class Listing{

  constructor(picture,title,description,userID){
    this.picture = picture;
    this.title = title;
    this.description = description;
    this.userID = userID;
  }

  toString(){
    let str = this.picture + " " + this.title + " " + this.description + " " + this.userID;
    return str;
  }



}
