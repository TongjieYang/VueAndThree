const files = require.context('.', false, /\.vue$/)
console.log('打印所有文件夹',files);
const pages = {}


files.keys().forEach(key => {

    pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default

})

console.log('打印所有文件夹2', pages);
export default pages