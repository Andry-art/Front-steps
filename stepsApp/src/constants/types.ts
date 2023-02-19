export type RegistrationNavigation = {
  LogIn: undefined;
  SignUp: undefined;
};

export type TabNavigation = {
  Main: undefined;
  Statistic: undefined;
};


export type textType =
  | 'none'
  | 'URL'
  | 'addressCity'
  | 'addressCityAndState'
  | 'addressState'
  | 'countryName'
  | 'creditCardNumber'
  | 'emailAddress'
  | 'familyName'
  | 'fullStreetAddress'
  | 'givenName'
  | 'jobTitle'
  | 'location'
  | 'middleName'
  | 'name'
  | 'namePrefix'
  | 'nameSuffix'
  | 'nickname'
  | 'organizationName'
  | 'postalCode'
  | 'streetAddressLine1'
  | 'streetAddressLine2'
  | 'sublocality'
  | 'telephoneNumber'
  | 'username'
  | 'password'
  | 'newPassword'
  | 'oneTimeCode'
  | undefined;

  export interface IUserDataResponse {
    "userId": String,
    "date": String,
    "steps": Number,
    "tokens": Number,
    "_id": String,
    "__v": Number
  }

  export interface IDailyData {
    userId?: string | null, 
    date?: string | number, 
    steps?: number, 
    tokens?: number,
    distance?: number 
  }

  export interface IUserData {
    data: Array<IUserDataResponse>;
    dailyData: IDailyData,
    isLoading: boolean;
    error: string;
  }

  export interface IStatisticType {
    date: string;
    steps: number;
    fullDate: string;
    tokens: number;
  }