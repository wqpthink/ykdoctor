import fs from "fs";

/**
 * 依据指定路径获取内部文件
 * @param path 路径
 * @returns {Array} 路径下文件绝对路径数组
 */
const filepaths = path =>{
    let pathArray = [];
    if(typeof path !== 'string') {
        throw new TypeError(path+':数据类型错误');
        return pathArray;
    }
    let exist = fs.existsSync(path);
    if(exist){
        let dirSync = fs.readdirSync(path);
        dirSync.map((item) => {
            let currentPath = path + '/' + item;
            let isFile = fs.statSync(currentPath).isFile();
            if(isFile) pathArray.push(currentPath);
        });
    }
    return pathArray;
};

export {filepaths};
