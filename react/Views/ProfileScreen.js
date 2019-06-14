/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Session from '../Models/Session';
import {styles} from '../Styles'
import Review from '../Models/Review';
import StarRating from 'react-native-star-rating';
import {TouchableOpacity, Image, FlatList, Platform, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';

let colors = ['white', 'F5FCFF'];

type Props = {};
export default class ProfileScreen extends Component<Props> {
  constructor(props){
    super(props);
    this.state = {reviews: [], srcs: [], newReview: '', starCount: 0};

    this.onStarRatingPress = this.onStarRatingPress.bind(this);
    this.handleReviewClick = this.handleReviewClick.bind(this);
  }

  async handleReviewClick(){
    let profile_id = this.props.navigation.getParam('creator').id;
    let stars = this.state.starCount;
    let review = this.state.newReview;
    var singleton = new Session();
    let reviewer_id = singleton.getID();
    let img = singleton.getAvatar();

    var body = JSON.stringify({
      profile_id: profile_id,
      stars: stars,
      review: review,
      reviewer_id: reviewer_id,
      img: img,
    });

    try{
      await fetch('http://74.208.18.28:8080/review',{
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

    this.props.navigation.navigate('Home');
  }

  

  onStarRatingPress(rating){
    this.setState({starCount: rating});

  }

  componentDidMount(){
    this.populateReviews();
  }


  async populateReviews(){
    let response = await fetch('http://74.208.18.28:8080/reviews?id='
        +this.props.navigation.getParam('creator').id);
    let responseJson = await response.json();
    const tempReviews = responseJson.map(function(obj){
      //profile_id, stars, review, reviewer_id
      return new Review(obj.profile_id, obj.stars, obj.review, obj.reviewer_id, obj.img);
    });
    this.setState({reviews: tempReviews});



  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: '#F5FCFF'}}>
        <View style={{margin:10, flexDirection: 'row', flex: 1}}>

          <View style={{alignContent: 'center',flex:1}}>
          <Image
            style={{height: 100, width: 100}}
            source={{uri: this.props.navigation.getParam('creator').picture}}
          />
          </View>

          <View style={{margin:10,flex:4, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 38}}>{this.props.navigation.getParam('creator').name}</Text>
            <StarRating
              disabled={false}
              maxStars={5}
              fullStarColor={'gold'}
              rating={this.props.navigation.getParam('creator').starRating}
              />
          </View>

        </View>
        <View style={{flex:3}}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.reviews}
            renderItem={({item, index}) =>
            <View style={{flexDirection: 'row',height: 80, paddingHorizontal:10, backgroundColor: colors[index % colors.length]}}>
              <View>
                <Image
                  style={{height: 65, width: 65}}
                  source={{uri: item.img}}
                />
                <StarRating
                  disabled={false}
                  maxStars={5}
                  fullStarColor={'gold'}
                  rating={item.stars}
                  starSize={15}
                />
              </View>
              <View style={{flexShrink: 1, margin: 5, paddingTop: 5}}>
              <Text  style={{}}numberOfLines={3}>
                {item.review}
              </Text>
              </View>

            </View>
          }
            />
        </View>
        <View style={{flex: 4, justifyContent: 'flex-start', }}>
          <View style={{marginHorizontal:20, flex: 3, backgroundColor: 'white', borderColor: 'black',borderWidth:1}}>
            <TextInput 
              style={{flex:1, margin:10}}
              onChangeText={(newReview) => this.setState({newReview})}
              multiline={true}
              numberOfLines={3}
              placeholder="Leave Review"
            />
          </View>

          <View style={{flex: 3,alignItems: 'center'}}>
            <View style={{margin:5,height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: "#7c95ca", width:80}}>
              <Button
                color="white"
                title="Submit"
                onPress={this.handleReviewClick}
              />
            </View>
            <StarRating
              disabled={false}
              maxStars={5}
              fullStarColor={'gold'}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
          </View>



        </View>



      </View>
    );
  }
}
