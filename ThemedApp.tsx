import * as React from 'react';
import { connect } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, extendTheme } from 'native-base';

import Navigation from './navigation';
import { ICompState } from "./types";


const mapStateToProps = (state: {company: ICompState}) => {
  const {compInfo} = state.company
  return {
    //loading: state.loading.models.users,
    compInfo
  };
}

const ThemedApp = ({compInfo}: any) => {

    const theme = extendTheme({
        colors: {
          // Add new color
          primary: {
            header: compInfo?.color_header || "#000",
            title_header: compInfo?.color_title_header || "#ffffff",
            background: compInfo?.color_background || "#f5f5f5",
            header_page: compInfo?.color_header_page || "#000000",
            menu_scroll: compInfo?.color_menu_scroll || "#ffffff",
            text_menu_scroll: compInfo?.color_text_menu_scroll || "#000000",
            background_card_dish: compInfo?.color_background_card_dish || "#ffffff",
            price_card_dish: compInfo?.color_price_card_dish || "#000",
            button_send_to_bucket: compInfo?.color_color_button_send_to_bucket || "#000",
          },
        },
        config: {
          // Changing initialColorMode to 'dark'
          initialColorMode: 'light',
        },
      });

   console.log(compInfo)
    return (
        <NativeBaseProvider theme={theme}>
                  <Navigation />
                  <StatusBar />
          </NativeBaseProvider>
    )
}

export default connect (mapStateToProps)(ThemedApp)