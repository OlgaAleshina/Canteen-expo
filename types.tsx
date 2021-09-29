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
  Category: {} | undefined;
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
  CategoriesList: undefined | string;
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

export type AppBarProps = {
  title?: string;
  cartCount?: null | number;
  navigation: ScreenProps["navigation"]
}

export type APIprops = {
  compID?: string;
  podDomen?: string;
  activeCategoryId?: number;
  paginationPage?: number;
}
export interface ICompState {
  compInfo: CompInfo | null;
  categories: {
      id: string;
      photo: string;
      name: string
    }[],
  dishes: {
      nextPage: number;
      prevPage: number;
      results: object[]
    } | {},
  activeCategory: ActiveCategory | null,
}

export type CompInfo = {
  id: string;
  name: string;
}
export type ActiveCategory = {
  id: string;
  name: string;
}
export type Dish = {
    name: string;
    price: number;
    weight: number;
    type_measure: string;
    photo?: string;
    structure?: string;
}

export type DishBarProps = {
  categories: {
    id: string,
    name: string
  }[];
  onCategoryClick: ({}:ActiveCategory) => void
}
export type DishCartProps = {
  dish: Dish,
  onAddButton: ({}: Dish) => void
}
export type CartItem = {
  id: string;
  name: string;
  price: number;
  weight: number;
  type_measure: string;
  amount: number;
  totalPrice: number;
}

export interface ICartState {
  dishes: CartItem[] | [];
  total: number
}