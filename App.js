import React from 'react'
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { fetchPeopleFromAPI} from './actions'

let styles

const App = (props) => {
  const{
    container,
    text,
    button,
    buttonText
  } = styles

  const { people, isFetching} = props.people

  return (
    <View style={container}>
      <Text style={text}>Reduc App</Text>
      <TouchableHighlight onPress={props.getPeople} style={button}>
        <Text style={buttonText}>Fetch Data</Text>
      </TouchableHighlight>

      {
        isFetching && <Text>Loading...</Text>
      }{
        people.length ? (
            people.map((persion,index) => {
              return(
                <View key={index}>
                  <Text>Name: {persion.name}</Text>
                </View>
              )
            })
        ):null
      }
    </View>
  )
}


styles = StyleSheet.create({
  container:{
    marginTop: 100,
    paddingLeft: 20,
    paddingRight: 20
  },
  text:{
    textAlign: 'center'
  },
  button:{
    backgroundColor: '#0b7eff',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: 'white'
  }
})

function mapStateToProps(state){
  return{
    people: state.people
  }
}

function mapDispatchToProps(dispatch){
  return{
    getPeople:() => dispatch(fetchPeopleFromAPI())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
