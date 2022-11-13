// in src/Schedules.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
  Datagrid,
  List,
  Show,
  Create,
  Edit,
  SimpleShowLayout,
  SimpleForm,
  TextField,
  TextInput,
  ShowButton,
  EditButton,
  DeleteButton,
  DateField,
  DateTimeInput,
  FileInput, 
  FileField,
  SelectInput
} from "react-admin";
import MapField from "../common/MapField";
import LocationInput from "../common/LocationInput";
import MyToolBar from "../common/toolbar";
import moment from "moment";

export const ScheduleList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="day" />
      <TextField source="name" />
      <TextField source="Place" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false}/>
    </Datagrid>
  </List>
);

export const ScheduleShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="day" />
      <TextField source="name" />
      <TextField source="type" />
      <FileField source="icon.src" label="Icon" title="icon.title" />
      <TextField source="Description" />
      <TextField source="place" />
      <DateField source="startTime" showTime={true} />
      <DateField source="endTime" showTime={true} />
      <MapField source="location"
      latitude={record => record._lat}
      longitude={record => record._long} />
    </SimpleShowLayout>
  </Show>
);

export const ScheduleCreate = (props) => (
  <Create {...props} >
    <SimpleForm toolbar={<MyToolBar />}>
      <TextInput source="day" />
      <TextInput source="name" />
      <SelectInput source="type" choices={[
        { id: 'birthday', name: 'Birthday Party' },
        { id: 'info', name: 'Information' },
        { id: 'group', name: 'Group' },
        { id: 'eat', name: 'Eating' },
        { id: 'physical', name: 'Physical Activity' }
      ]} />
      <FileInput source="icon" label="Icon" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="Description" />
      <DateTimeInput source="startTime" />
      <DateTimeInput source="endTime" />
      <TextInput source="place" />
      <LocationInput source="location" />
    </SimpleForm>
  </Create>
);

export const ScheduleEdit = (props) => (
  <Edit {...props}>
    <SimpleForm toolbar={<MyToolBar />}>
      <TextInput source="day" />
      <TextInput source="name" />
      <SelectInput source="type" choices={[
        { id: 'birthday', name: 'Birthday Party' },
        { id: 'info', name: 'Information' },
        { id: 'group', name: 'Group' },
        { id: 'eat', name: 'Eating' },
        { id: 'physical', name: 'Physical Activity' }
      ]} />
      <FileInput source="icon" label="Icon" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="Description" />
      <DateTimeInput source="startTime" />
      <DateTimeInput source="endTime" />
      <TextInput source="place" />
      <LocationInput source="location" />
    </SimpleForm>
  </Edit>
);
