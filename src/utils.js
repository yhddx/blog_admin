export function get_api_host(request) {
    if(process.env.API_SERVER === 'online'){ //需要在机器上设置环境变量 export API_SERVER=online
        //正式环境
        return `https://yhddx.cn/api`;
    }else{
        //测试环境
        return `http://127.0.0.1:8888`;
    }
}