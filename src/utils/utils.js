/**
 * 工具函数
 * data: 必须是已转化为日期对象的值
 * rule: 日期规则
 */
export default {
    formateDate(data,rule){
        let fmt = rule || 'yyyy-MM-dd hh:mm:ss';
        const obj = {
            "y+": data.getFullYear(),
            "M+": data.getMonth() + 1,
            "d+": data.getDate(),
            "h+": data.getHours(),
            "m+": data.getMinutes(),
            "s+": data.getSeconds()
        };
        for(let item in obj){
            let re = new RegExp(`${item}`);
            if(re.test(fmt)){
                let target = ('0'+obj[item]).length == 2? '0'+ obj[item]: obj[item]
                fmt = fmt.replace(re,target)
            }
        }
        return fmt;
    }
}