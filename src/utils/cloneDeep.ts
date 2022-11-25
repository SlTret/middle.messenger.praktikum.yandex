function cloneDeep<T extends object = object>(obj: T) {

    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
 
    if (obj instanceof Date) { return new Date(obj); }
    if (obj instanceof String) { return new String(obj); }
    if (obj instanceof Number) { return new Number(obj); }
    if (obj instanceof Boolean) { return new Boolean(obj); }
    if (obj instanceof RegExp) { return new RegExp(obj); }
 
    let clone: any = {} ;
    if (obj instanceof Array) {
        clone = new Array(obj.length);
    }
 
    for(const key of Object.keys(obj) as Array<keyof typeof obj>) {
        if(typeof(obj[key])  === 'object' && obj[key] !== null) {
            clone[key] = cloneDeep(obj[key] as {[key:string] : any});
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;

}


export { cloneDeep }