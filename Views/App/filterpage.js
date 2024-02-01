import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View, 
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Switch
} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import * as Icon from "react-native-vector-icons";
import { rootAddress } from '../../constants'
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('screen');


export default class Filterpage extends React.Component {
  static navigationOptions = {
    header: null,
  };


  

  state = {
    sort: "distance",
    type: "all",
    price : 'free',
    option_all: true,
    option_rated: false,
  }
  handleSubmit = async() => {
    const {
      sort,
      type,
      price,
      option_all,
      option_rated,
    } = this.state;
    /*
    console.log('Sort By:', sort);
    console.log('Type:', type);
    console.log('Price:', price);
    console.log('Show All Spots:', option_all);
    console.log('Show Highly Rated Spots:', option_rated);
    */

    const sortOrder = sort === 'ratings' ? '0' : '1'
    let camptype = '2'//all
    if (type === "tenting") camptype = "0"
    if (type === "rv") camptype = "1"
    let userLat
    let userLng

    // Request location permission
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    userLat = location.coords.latitude;
    userLng  = location.coords.longitude;
  }
    
    console.log(JSON.stringify({
      "all": option_all,
      "highlyRated": option_rated,
      "sortOrder":sortOrder,
      "camptype":camptype,
        "userLat": userLat,
        "userLng": userLng,
    }))

    try{
      const response = await fetch(`http://${rootAddress}:3000/getcamps`,{
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        "all": option_all,
        "highlyRated": option_rated,
        "sortOrder":sortOrder,
        "camptype":camptype,
        "userLat": userLat,
        "userLng": userLng,
      }),
    })


   
    if (response.ok) {
      //  successful
      const data = await response.json();
      console.log('fetch successful:', data);
      const { navigation } = this.props;
      // const sended = response.data
      navigation.navigate('CampgroundMap',{"campgrounds":data})
    } else {
      //  failed
      const errorData = await response.json();
      console.error('fetch failed:', response.status, errorData.error);
    }
  }
  catch (error) {
    console.error('Error during fetch:', error);
  }

  
}
  renderHeader() {
    return (
      <View style={styles.header}>
        <View style={{  flex:1 }}>
         <Ionicons name='arrow-back' size={24} />
        </View>

        <View style={{  flex:1 , alignItems: "center"}}>
          <Text style={styles.title}>Filter</Text>
        </View>

        <View  style={{  flex:1 , alignItems: "flex-end"}}>
          <Ionicons name='search' size={24} />
        </View>
      </View>
    );
  }

  render() {

    const {
      sort,
      type,
      price,
      option_all,
      option_rated,
     
    } = this.state;

    const activeType = key => type === key;

    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        <ScrollView style={styles.container}>

        <View style={styles.section}>
            <View>
              <Text style={styles.title}>Sort By</Text>
            </View>
            <View style={styles.group}>
               <TouchableOpacity
                style={[styles.button, sort === 'distance' ? styles.active : null]}
                onPress={()=> this.setState({sort : 'distance'})}
                >
                 <Text>Distance</Text>
               </TouchableOpacity>

               <TouchableOpacity
                style={[styles.button, sort === 'ratings' ? styles.active : null]}
                onPress={()=> this.setState({sort : 'ratings'})}
                >
                 <Text>Ratings</Text>
               </TouchableOpacity>

               <TouchableOpacity
                style={[styles.button, sort === 'review' ? styles.active : null]}
                onPress={()=> this.setState({sort : 'review'})}
                >
                 <Text>Review</Text>
               </TouchableOpacity>

            </View>
        </View>  

         <View style={styles.section}>
            <View>
              <Text style={styles.title}>Type</Text>
            </View>
            <View style={styles.group}>
               <TouchableOpacity
                style={[styles.button, type === 'all' ? styles.active : null]}
                onPress={()=> this.setState({type : 'all'})}
                >

                <View style={{ flexDirection: "row" }}>
                  <Icon.Foundation
                    name="mountains"
                    size={24}
                    color={activeType("all") ? "#000" : "#FF7657"}
                  />
                  <Icon.FontAwesome
                    name="truck"
                    size={24}
                    color={activeType("all") ? "#000" : "#FFBA5A"}
                  />
                </View> 

                 <Text>All</Text>
               </TouchableOpacity>

               <TouchableOpacity
                style={[styles.button, type === 'tenting' ? styles.active : null]}
                onPress={()=> this.setState({type : 'tenting'})}
                >
                 <Icon.Foundation
                  name="mountains"
                  size={24} 
                  color={activeType("tenting") ? "#000" : "#FF7657"}
                /> 
                 <Text>tenting</Text>
               </TouchableOpacity>

               <TouchableOpacity
                style={[styles.button, type === 'rv' ? styles.active : null]}
                onPress={()=> this.setState({type : 'rv'})}
                >
                
                <Icon.FontAwesome
                  name="truck"
                  size={24}
                  color={activeType("rv") ? "#000" : "#FFBA5A"}
                />
                 <Text>RV </Text>
               </TouchableOpacity>

            </View>
        </View>  


        <View style={styles.section}>
            <View>
              <Text style={styles.title}>Price</Text>
            </View>
            <View style={styles.group}>
               <TouchableOpacity
                style={[styles.button, price === 'free' ? styles.active : null]}
                onPress={()=> this.setState({price : 'free' })}
                >
                 <Text >Free</Text>
               </TouchableOpacity>

               <TouchableOpacity
                style={[styles.button, price === '+50' ? styles.active : null]}
                onPress={()=> this.setState({price : '+50'})}
                >
                 <Text>+ 50</Text>
               </TouchableOpacity>

               <TouchableOpacity
                style={[styles.button, price === '+100' ? styles.active : null]}
                onPress={()=> this.setState({price : '+100'})}
                >
                 <Text>+ 100</Text>
               </TouchableOpacity>

            </View>
        </View>  


          <View style={styles.section}>
            <View>
              <Text style={styles.title}>More Options </Text>
            </View>
            <View>
              <View style={styles.option}>
                <Text  style={{ fontWeight: "500" }}>Show ALL spots</Text>
                <Switch 
                  value={option_all}
                  ios_backgroundColor="#EAEAED"
                  trackColor={{ false: "#EAEAED", true: "#FF7657" }}
                  onValueChange={() =>
                  this.setState({option_all : !option_all })
                  }
                
                />
              </View>
              <View style={styles.option}> 
                <Text style={{ fontWeight: "500" }} >Show Highly Rated spots</Text>
                <Switch

                value={option_rated}
                ios_backgroundColor="#EAEAED"
                trackColor={{ false: "#EAEAED", true: "#FF7657" }}
                onValueChange={() =>
                this.setState({option_rated : !option_rated })
                }
                />
              </View>
            </View>
          
          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={()=>this.handleSubmit()}
          >
            <Text style={styles.submitButtonText}>Go</Text>
          </TouchableOpacity>
        </View>    
        
        </ScrollView>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.1,
    width: width,
    paddingHorizontal: 14
  },
  title: {
    fontSize: 18,
    marginVertical: 14
  },
  section: {
    flexDirection: "column",
    marginHorizontal: 14,
    marginBottom: 14,
    paddingBottom: 24,
    borderBottomColor: "#EAEAED",
    borderBottomWidth: 1
  },
  group:{

  flexDirection: 'row',
  borderRadius : 7,
  borderWidth :1,
  borderColor: "#FF7657",
  justifyContent : 'space-between'

  },
  button: {
    flex: 1,
    padding: 14,
    alignContent: "center",
    alignItems: "center"
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "500"
  },
  active: {
    backgroundColor: "#FF7657",

  },
  activeText: {
    color: "#FFF"
  },
  option: {
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  submitButton: {
    backgroundColor: '#FF7657',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    margin: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
