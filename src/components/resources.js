// in src/Resources.js
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
  SelectInput
} from "react-admin";

export const ResourceList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="title" />
      <ShowButton label="" />
      <EditButton label="" />
      <DeleteButton label="" redirect={false}/>
    </Datagrid>
  </List>
);

export const ResourceShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <TextField source="url" />
      <FileField source="file.src" label="Image" title="file.title" />
    </SimpleShowLayout>
  </Show>
);

export const ResourceCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput source="type" choices={[
        { id: 'url', name: 'URL' },
        { id: 'mobile', name: 'Mobile' }
      ]} />
      <TextInput source="url" />
      <FileInput source="file" label="Image" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);

export const ResourceEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <SelectInput source="type" choices={[
        { id: 'url', name: 'URL' },
        { id: 'mobile', name: 'Mobile' }
      ]} />
      <TextInput source="url" />
      <FileInput source="file" label="Image" accept="image/*">
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Edit>
);
