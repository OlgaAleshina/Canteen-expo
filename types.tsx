/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Dispatch } from "redux";
import { History } from "history";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Cart: undefined;
  CategoriesList: {} | undefined;
  Category: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;

};

export type AppTabParamList = {
  CategoriesList: undefined | string,
  Category: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export interface IGlobalProps {
  history: History;
  dispatch: Dispatch<any>;
}

export type ScreenProps = NativeStackScreenProps<RootStackParamList>

export type APIprops = {
  compID?: string,
  podDomen?: string,
  activeCategoryId?: number,
  paginationPage?: number,
}
export interface ICompState {
  compInfo: null | {},
  categories: [],
}
