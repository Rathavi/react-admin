// in src/Snapspace.js
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
  FileInput,
  SelectInput,
  DateField,
  DateInput
} from "react-admin";

export const SnapList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false}/>
    </Datagrid>
  </List>
);

export const SnapShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <FileField source="file.src" label="Image" title="file.title" />
    </SimpleShowLayout>
  </Show>
);

export const SnapCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="title" />
      <FileInput source="file" label="Image" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);

export const SnapEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <FileInput source="file" label="Image" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);
