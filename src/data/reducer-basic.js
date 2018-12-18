import path from 'path';
import fs from 'fs';
import {combineReducers} from 'redux-immutable';
import {reducer as headerReducer} from '_common/header/store/interface';
import {reducer as sidenavReducer} from '_common/sidenav/store/interface';
import {reducer as homeReducer} from '_page/home/store/interface';
import {reducer as loginReducer} from '_page/login/store/interface';


export default combineReducers({
    header: headerReducer,
    sidenav: sidenavReducer,
    home: homeReducer,
    login: loginReducer
});

const results_import = []; //import集
const results_reducer = {}; //reducer集

const wrapper_handle = (p) => {
    const _file_name_ = path.basename(p);
    const _store_ = path.dirname(path.resolve(p, ".."));
    const _parent_name_ = path.dirname(path.resolve(p, ".."+path.sep+"..")).toLowerCase();
    if(_file_name_ === "interface.js" && _store_ === "store"){
        results_import.push("import {reducer as " + _parent_name_ +"Reducer} from '" + p + "';");
        results_reducer[_parent_name_] = _parent_name_ +"Reducer";
    }
};

const wrapper_conf = (p) => {
    const stats = fs.statSync(p);
    if(stats.isFile()){
        return p;
    }
    if(stats.isDirectory()){
        const ps = fs.readdirSync(p);
        for(let i=0; i<ps.length; i++){
            const _ps_ = p + path.sep + ps[i];
            const pth = wrapper_conf(_ps_);
            if(pth) wrapper_handle(pth);
        }
    }
};

/**
 * 约定优于配置
 */
const auto_conf_reducer = (root) => {
    const root_path = path.resolve(__dirname, root);
    const dirs = fs.readdirSync(root_path);
    for(let i=0; i<dirs.length; i++){
        const p = root_path + path.sep + dirs[i];
        const stats = fs.statSync(p);
        if(stats.isFile()){
            wrapper_handle(p);
        }
        if(stats.isDirectory()){
            wrapper_conf(p);
        }
    }

    results_import.push("import path from 'path';");
    results_import.push("import path from 'path';");
    results_import.push("import fs from 'fs';");
    results_import.push("import {combineReducers} from 'redux-immutable';");

    //file append data
};
