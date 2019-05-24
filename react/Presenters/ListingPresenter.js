export default class ListingPresenter{
  constructor(){

  }

  async createListing(picture="",title="",description="",userID=0){
    //send parameters to backend


    try{
      await fetch('http://localhost:8080/listing',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
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
