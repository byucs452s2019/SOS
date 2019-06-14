import Session from '../Models/Session';
export default class LoginPresenter{
  constructor(view){
    this.view = view;
  }

  async handleLogin(username,password){
    //query and find username in db
    console.log("handle login");
    fetch('http://74.208.18.28:8080/login',{
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) =>response.json())
          .then((responseJson) => {
            const singleton = new Session(responseJson.id, responseJson.profileType, 
              responseJson.firstName, responseJson.lastName, responseJson.username,
              responseJson.email,responseJson.avatar, responseJson.businessName);
          })
          .catch((error) => {
            console.log(error);
          });

    this.view.props.navigation.navigate('Home');
  }
}
