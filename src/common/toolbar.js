import {
    Toolbar, 
    SaveButton
} from "react-admin";

const MyToolBar = () => (
    <Toolbar>
        <SaveButton alwaysEnable />
    </Toolbar>
);

export default MyToolBar;