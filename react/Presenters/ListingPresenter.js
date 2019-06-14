import {Platform} from 'react-native';
import { RNS3 } from 'react-native-aws3';



export default class ListingPresenter{
  constructor(view){
    this.view = view;

  }

  async createListing(picture="",title="",description="",userID=0){

    const img = {
      uri: picture.uri,
      name: picture.fileName,
      type: "image/jpeg"
    };

    var options = {
      keyPrefix: "folder/",
      bucket: 'sosphotos',
      region: "us-west-1",
      accessKey: "AKIAJ67PJWGOC26ERDZA",
      secretKey: "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",
    }



    let promise = await RNS3.put(img,options).then(response => {
      if (response.status !== 201){
        console.log("error");
      }
      console.log("success");
      photo_url = response.body.postResponse.location;
    });

    try{
      await fetch('http://74.208.18.28:8080/listing',{
      //await fetch('http://localhost:8080/listing',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pic: photo_url,
        title: title,
        description: description,
        user_id: userID,
      }),
    });
  }catch(e){
    console.log(e);
  }

  this.view.props.navigation.getParam('callback')();
  this.view.props.navigation.navigate('Home');
}

}
