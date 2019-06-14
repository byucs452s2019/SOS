export default class Session{
  constructor(id=0,profiletype="",first="",last="",user="",email="",avatar="",business=""){
    if(!!Session.instance){
      return Session.instance;
    }
    Session.instance = this;

    this.id = id;
    this.profiletype = profiletype;
    this.firstName = first;
    this.lastName = last;
    this.username = user;
    this.email = email;
    this.avatar = avatar;
    this.businessName = businessName;

    return this;
    }

    getID(){
      return this.id;
    }
    getProfileType(){
      return this.profiletype;
    }
    getAvatar(){
      return this.avatar;
    }

}
