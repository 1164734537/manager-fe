/** 
 *环境配置封装
**/ 
// 获取环境变量

const env = import.meta.env.MODE || 'prod';
const EnvConfig = {
    dev:{
        baseApi:'/',
        mockApi:'https://www.fastmock.site/mock/bf31a37287e7b3815e8da1b5b7324c89/api'
    },
    test:{
        baseApi:'//test.futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/bf31a37287e7b3815e8da1b5b7324c89/api'
    },
    prod:{
        baseApi:'//futurefe.com/api',
        mockApi:'https://www.fastmock.site/mock/bf31a37287e7b3815e8da1b5b7324c89/api'
    }
}
export default {
    env,
    mock:true,
    ...EnvConfig[env],
    namespace:"manager"
}