export function tryCatch(_target: any, _propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    const method: Function = descriptor.value;

    descriptor.value = async function execute(...args: any) {
        try {
            await method.apply(this, args);
        } catch (e) {
            const [, , next] = args;
            return next(e);
        }
    };
}
