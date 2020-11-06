// 防抖函数：调用后在一定的时间内函数不执行，过了限时执行，在限时内再次调用会重新开启定时器
export function debounce(func, delay) {
    let inDebounce;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(inDebounce); // 定时器用来执行函数
        inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
}


// 截流函数：调用后在限时内执行一次，限时内再次调用，函数执行判断条件为关闭状态，函数不执行，函数执行后判断条件打开
export function throttle (fun, delay = 500) {
    let prev = new Date();
    return function (args) {
        let now = new Date();
		let that = this;
        if (now - prev > delay) {
            fun.call(that, args);
            prev = now
        }
    }
}