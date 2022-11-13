# Get started
You need to add the private Firebase connection file: `src/FIREBASE_CONFIG.js` with the following format from firebase:

``` js
export const firebaseConfig = {
  apiKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  authDomain: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  databaseURL: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  projectId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  storageBucket: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  messagingSenderId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  appId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  googleMapApiKey: "aaaaaaaaaaaaaaaaaaaaaaaaaaa",
  initialMapView: { lat: 23.67986554710392, lng: 78.70234657296804, zoom: 4}
};
```

Don't forget to add the `export` infront of the configuration that Firebase gives you!

Then just run `npm run start`
