export default class Creator{

  constructor(picture,name,userID){
    this.picture = picture;
    this.name = name
    this.userID = userID;
  }

  toString(){
    let str = this.name + " " + this.userID;
    return str;
  }



}
