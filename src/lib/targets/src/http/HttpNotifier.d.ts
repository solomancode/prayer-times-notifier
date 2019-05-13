export declare abstract class HttpNotifier {
    private host?;
    headers: {
        'Content-Type': string;
    };
    constructor(host?: string);
    post: (url: string, body: Object) => Promise<import("node-fetch").Response>;
    setHeader(key: string, value: string): void;
}
