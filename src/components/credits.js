// in src/Credits.js
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
  FileField,
  FileInput
} from "react-admin";

export const CreditList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="text" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false}/>
    </Datagrid>
  </List>
);

export const CreditShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="text" />
    </SimpleShowLayout>
  </Show>
);

export const CreditCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="text" />
    </SimpleForm>
  </Create>
);

export const CreditEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="text" />
    </SimpleForm>
  </Edit>
);
