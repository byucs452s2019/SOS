import { RNS3 } from 'react-native-aws3';
import Session from '../Models/Session';

export default class RegisterPresenter{
  constructor(view){
    this.view = view;
  }

  async handleRegister(profile,first,last,username,email,password,avatar="",business=""){
    const img = {
      uri: avatar.uri,
      name: avatar.fileName,
      type: "image/jpeg"
    };

    var options = {
      keyPrefix: "avatar/",
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
      avatar_url = response.body.postResponse.location;
    });

    var id = await this.getNextId();
    var body = JSON.stringify({
        id: id,
        profileType: profile,
        firstName: first,
        lastName: last,
        username: username,
        email: email,
        password: password,
        avatar: avatar_url,
        businessName: business,
        avgStarUser: 2.5,
        avgStarCreator: 2.5
      });

    try{
      await fetch('http://74.208.18.28:8080/user',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: body,
      });
    }catch(e){
      console.log(e);
    }





    this.view.props.navigation.navigate('Login');
  }

async getNextId(){
    let response = await fetch('http://74.208.18.28:8080/nextid');
    let responseJson = await response.json();
    return responseJson.id;
  }


}
