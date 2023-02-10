import BackgroundFetch from 'react-native-background-fetch';

let headlessTaskRegistered = false;

 const configureBackgroundFetch = (data: any) => {
  BackgroundFetch.configure({
    minimumFetchInterval: 15,
    stopOnTerminate: false,
    startOnBoot: true,
    enableHeadless: true
  }, () => {
    console.log('[BackgroundFetch] Event received');
  }, (error) => {
    console.log('[BackgroundFetch] Error:', error);
  });

   if (!headlessTaskRegistered) {
    BackgroundFetch.registerHeadlessTask(data);
    headlessTaskRegistered = true;
  }

  BackgroundFetch.start();
}

export default configureBackgroundFetch;