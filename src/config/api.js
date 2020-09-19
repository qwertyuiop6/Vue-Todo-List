//axios环境baseUrl配置
let development = 'http://localhost:8000';
// let production = '';
export {
    development,
    // production,
}

//默认导出API接口配置
export default {
    todo: '/api/todolist',
    login: '/auth'
}