export default class ListingPresenter{
  constructor(){

  }

  async createListing(picture,title,description,userID){
    //send parameters to backend


    try{
      fetch('http://localhost:8080/listing',{
      method: 'POST',
      body: JSON.stringify({
        pic: picture,
        title: title,
        description: description,
        user_id: userID,
      }),
    });
  }catch(e){
    console.log(e);
  }
}
}
