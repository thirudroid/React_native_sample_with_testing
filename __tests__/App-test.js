/**
 * @format
 */

import 'react-native';
import {TouchableHighlight,Text} from 'react-native';
import renderer from 'react-test-renderer'
import React from 'react';
import App from '../App';
import configureStore from '../configureStore';
import {Provider} from 'react-redux';
import {
  FETCHING_PEOPLE,
  FETCHING_PEOPLE_SUCCESS,
  FETCHING_PEOPLE_FAILURE
} from '../constants'
import peopleReducer from '../reducers/people'

const store = configureStore()
const snap = renderer.create(<Provider store = {store}>
  <App/>
  </Provider>);

it('renders correctly', () => {
  expect(snap.toJSON()).toMatchSnapshot();
  const button = snap.root.findByType(TouchableHighlight);
  const text = button.findByType(Text);
  expect(text.props.children).toBe("Fetch Data");
});

describe('Reducers', ()=> {
  let initialState = {
    people: [],
    isFetching: false,
    error: false
}

it('Should be initialState', ()=> {
  let reducer = peopleReducer(undefined, {});
  expect(reducer).toEqual(initialState);
 });

 it('should handle FETCH_PEOPLE', () => {
  expect(
    peopleReducer(initialState, {
      type: FETCHING_PEOPLE
    })
  ).toEqual(
    {"error": false, "isFetching": true, "people": []}
  )})

  it('should handle FETCH_PEOPLE_SUCCESS', () => {
    expect(
      peopleReducer(initialState, {
        type: FETCHING_PEOPLE_SUCCESS
      })
    ).toEqual(
      {"error": false, "isFetching": false}
    )})

    it('should handle FETCH_PEOPLE_FAILURE', () => {
      expect(
        peopleReducer(initialState, {
          type: FETCHING_PEOPLE_FAILURE
        })
      ).toEqual(
        {"error": true, "isFetching": false,"people":[]}
      )})

});