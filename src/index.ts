import { Helper, sleep} from './helper';
(global as any)['__Zone_disable_EventEmitter'] = true; 
// example();
(async () => {
    try {
        let instance = Helper.getInstance(); // сделать что-нибудь с экземпляром...
        // await instance.operate(97345363);
        // await instance.operate(1194420);
        // await instance.operate(106119817);
        // await instance.operate(1816428);
        // await instance.operate(65358839);
        await sleep(1000);
        // await instance.browser.close();
            } catch (error) {
        console.log(error)
    }
    await sleep(1000);
})();