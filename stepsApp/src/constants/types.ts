export type RegistrationNavigation = {
  LogIn: undefined;
  SignUp: undefined;
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

  export interface IUserData {
    id: String;
    balance: Number;
    dailySteps: Number;
    dailyActiveTime: Number;
    dailyDestenation: Number;
    dailyBalance: Number;
    stepsHistory: Array<{ date: Date; steps: Number; tokens: Number }>;
    isLoading: boolean;
    error: string;
  }