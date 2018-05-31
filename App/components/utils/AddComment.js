import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage,
  Image,
  ScrollView,
  FlatList
} from 'react-native';
import { Constants, Speech, Video, ImagePicker} from 'expo';
import Accordion from 'react-native-collapsible/Accordion';
import Lightbox from 'react-native-lightbox';

const SECTIONS = [
  {
    title: 'First',
    content: 'Comments'
  },
];

class AddComment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: '',
      list: [],
      image: null,
      commList: [],
      curTime: ''
    }
  }

  componentDidMount() {
    var datee = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    var date, TimeType, hour, minutes, seconds, fullTime;

    date = new Date();
    hour = date.getHours();

    if(hour <= 11)
    {
      TimeType = 'AM';
    }
    else{
      TimeType = 'PM';
    }

    if( hour > 12 )
    {
      hour = hour - 12;
    }
    if( hour == 0 )
    {
        hour = 12;
    }

    minutes = date.getMinutes();

    if(minutes < 10)
    {
      minutes = '0' + minutes.toString();
    }

    seconds = date.getSeconds();
    if(seconds < 10)
    {
      seconds = '0' + seconds.toString();
    }
    fullTime = hour.toString() + ':' + minutes.toString() +  TimeType.toString()
                + '\n' + datee.toString() + '.' + month.toString() + '.' + year.toString();

    this.setState({
      curTime: fullTime
    });
  }

  changeComment(comment) {
    this.setState({comment});
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri })

      let base64Img = `data:image/jpg;base64,${result.base64}`

      //Add your cloud name
      let apiUrl = 'https://api.cloudinary.com/v1_1/<your_cloud_name>/image/upload';

      let data = {
        "file": base64Img,
        "upload_preset": "<your_upload_preset>",
      }

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(r=>{
        let data = r._bodyText
        console.log(JSON.parse(data).secure_url)
      }).catch(err=>console.log(err))
    }
  }

  buttonPressed() {
    const arrayData = [];
    if (this.state.comment) {
        const data = {
          image: this.state.image,
          comment: this.state.comment,
          time: this.state.curTime
        }
        arrayData.push(data);
        var destinationArray;
        this.fetch();
        try {
          AsyncStorage.getItem(`comm_${this.props.idMeal}`).then((value) => {
            if (value !== null) {
              const d = JSON.parse(value);
              d.push(data);
              let p = [];
              AsyncStorage.setItem(`comm_${this.props.idMeal}`, JSON.stringify(d)).then(
                () => {
                  destinationArray = Array.from(d);
                  this.setState({list: arrayData,
                                commList: arrayData,
                                image: null,
                                comment: '',
                                curTime: ''});
                })
                this.fetch();
            }
            else {
              let p = [];
              AsyncStorage.setItem(`comm_${this.props.idMeal}`, JSON.stringify(arrayData))
                .then(() => {
                  destinationArray = Array.from(arrayData);
                  this.setState({list: arrayData,
                                commList: arrayData,
                                image: null,
                                comment: '',
                                curTime: ''});
              })
              this.fetch();
            }
          })
        }
        catch(err) {
          console.log("The comment must have a comment text!");
        }
    }
    else {
      console.log("Error!");
    }
  }

  componentWillMount() {
    try{
      AsyncStorage.getItem(`comm_${this.props.idMeal}`).then((value) => {
        this.setState({
          list: JSON.parse(value),
          commList: JSON.parse(value)
        })
      })
    }
    catch(err) {
      console.log("Error!", err);
    }
  }

  fetch() {
    try{
      AsyncStorage.getItem(`comm_${this.props.idMeal}`).then((value) => {
        this.setState({
          list: JSON.parse(value),
          commList: JSON.parse(value)
        })
      })
    }
    catch(err) {
      console.log("Error!", err);
    }
  }

  _renderHeader(section) {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Comments</Text>
      </View>
    );
  }

  _renderContent(section) {
    let color;
    if(this.state.commList) {
      return this.state.commList.map((data, i) => {
        return (
          <View key={i} style={styles.dataList}>
            <View style={{width: 350, backgroundColor: i%2==0 ? '#F0F0F0' : '#FFFFFF', position: 'relative'}}>
            <View style={{width: 280, backgroundColor: i%2==0 ? '#F0F0F0' : '#FFFFFF'}}>
              <Text style={{fontWeight: 'bold', fontSize: 16}}>NAme</Text>
              <Text>{data.comment}</Text>
              </View>
                <Lightbox
                activeProps={{
                    resizeMode: 'contain',
                    source: { uri: data.image },
                    style: { flex: 1, width: null, height: null }
                }}
                >
                  <Image resizeMode="cover" source={{uri: data.image}} style={{width:60, height:60}} />
                </Lightbox>
              </View>
            <View style={{height:40, width: 70, marginLeft: 280, marginTop: 0, backgroundColor: i%2==0 ? '#F0F0F0' : '#FFFFFF', position: 'absolute'}}>
              <Text>{data.time}</Text>
            </View>
          </View>
        )})
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Accordion
             sections={SECTIONS}
             // renderSectionTitle={this._renderSectionTitle.bind(this)}
             renderHeader={this._renderHeader.bind(this)}
             renderContent={this._renderContent.bind(this)}
           />
        </View>
        <View>
          <Text style={styles.title}>Add a comment</Text>
          <TextInput
            multiLine={true}
            style={[styles.input, styles.textArea]}
            placeholder='Comment'
            value={this.state.comment}
            onChangeText={(comment) => this.changeComment(comment)}
          />
          <View style={styles.containerr}>
           <TouchableOpacity onPress={()=>this.pickImage()} style={{width: 200, alignSelf: 'center'}}>
             <View style={{backgroundColor:'transparent'}}>
             {this.state.image ?
               <Image source={{uri: this.state.image}} style={{width: 200, height: 200, borderRadius: 100, alignSelf:'center'}}/>
               :
               <View style={{ backgroundColor: 'grey', width: 200, height: 200, borderRadius: 100}}>
                <View style={styles.textPicker}>
                  <Text>Add a photo</Text>
                  <Text>from Camera Roll</Text>
                </View>
               </View>
             }
             </View>
           </TouchableOpacity>
         </View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.buttonPressed()}>
              <Text style={styles.textButton}>Add</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  button: {
    backgroundColor: '#893667',
    paddingTop: 15,
    paddingBottom: 15
  },
  textButton: {
    textAlign: 'center',
    color: 'white'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 5
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 20
  },
  textArea: {
    height: 60
  },
  containerr: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  textPicker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  header: {
   backgroundColor: '#893667',
   padding: 10
 },
 headerText: {
   textAlign: 'center',
   fontSize: 16,
   fontWeight: '500'
 },
 content: {
   padding: 20,
   backgroundColor: '#fff'
 },
 active: {
   backgroundColor: 'rgba(255,255,255,1)'
 },
 inactive: {
   backgroundColor: 'rgba(245,252,255,1)'
 },
 selectors: {
   marginBottom: 10,
   flexDirection: 'row',
   justifyContent: 'center'
 },
 selector: {
   backgroundColor: '#F5FCFF',
   padding: 10
 },
 activeSelector: {
   fontWeight: 'bold'
 },
 selectTitle: {
   fontSize: 14,
   fontWeight: '500',
   padding: 10
 },
 dataList: {
  // marginBottom: 5,
  // marginTop: 5,
  marginLeft: 5,
 },
})

export default AddComment;
