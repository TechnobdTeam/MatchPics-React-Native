import React, { Fragment } from 'react';
import * as RC from 'react-native';

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';


const HeaderStyle = RC.StyleSheet.create({
  headerContainer: {
    backgroundColor: '#f8dc6f',
    maxHeight: 48
  },

  header: {
    fontSize: RFValue(24), // second argument is standardScreenHeight(optional),
    textAlign: "center",
    width: '100%',
    height: 48,
    backgroundColor: '#f8dc6f',
    display: 'flex',
    alignItems: 'center',
  },

  headerSearch: {
    fontSize: RFValue(24), // second argument is standardScreenHeight(optional),
    textAlign: "left",
    width: '100%',
    fontSize: 16,
    height: 38,
    borderRadius: 50,
    backgroundColor: '#FFF',
    position: 'relative',
    paddingLeft: 40,
    fontFamily: 'Roboto-Regular',
  },

  headerSearchIcon: {
    position: 'absolute',
    left: 15,
    color: '#9d9d9d',
    top: 10,
  },


  //   instructions: {
  //   textAlign: "center",
  //   color: "#333333",
  //   marginBottom: RFPercentage(34),
  //   fontSize: RFPercentage(4),
  //   borderColor: 'red',
  //   borderWidth: 2,
  //   borderStyle: 'solid',
  // },

});

export default HeaderStyle;