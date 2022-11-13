import * as React from "react";
import { BatchList, BatchShow, BatchCreate, BatchEdit } from "./components/batches";
import { CreditList, CreditShow, CreditCreate, CreditEdit } from "./components/credits";
import { ResourceList, ResourceShow, ResourceCreate, ResourceEdit } from "./components/resources";
import { ScheduleList, ScheduleShow, ScheduleCreate, ScheduleEdit } from "./components/schedules";
import { SnapList, SnapShow, SnapCreate, SnapEdit } from "./components/snapspace";
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider
} from "react-admin-firebase";
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CustomLoginPage from './CustomLoginPage';

import { firebaseConfig as config } from './FIREBASE_CONFIG';

const options = {
  logging: false,
  rootRef: ''
}
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);

class App extends React.Component {
  render() {
    return (
      <Admin
        loginPage={CustomLoginPage} 
        dataProvider={dataProvider}
        authProvider={authProvider}
      >
        <Resource
          name="batches"
          icon={BatchPredictionIcon}
          list={BatchList}
          show={BatchShow}
          create={BatchCreate}
          edit={BatchEdit}
        />
        <Resource
          name="credits"
          icon={CreditCardIcon}
          list={CreditList}
          show={CreditShow}
          create={CreditCreate}
          edit={CreditEdit}
        />
        <Resource
          name="resources"
          icon={RssFeedIcon}
          list={ResourceList}
          show={ResourceShow}
          create={ResourceCreate}
          edit={ResourceEdit}
        />
        <Resource
          name="schedules"
          icon={ScheduleIcon}
          list={ScheduleList}
          show={ScheduleShow}
          create={ScheduleCreate}
          edit={ScheduleEdit}
        />
        <Resource
          name="snapspace"
          icon={AddAPhotoIcon}
          list={SnapList}
          show={SnapShow}
          create={SnapCreate}
          edit={SnapEdit}
        />
      </Admin>
    );
  }
}

export default App;
