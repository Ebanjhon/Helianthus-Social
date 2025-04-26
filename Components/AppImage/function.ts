export function replaceLocalhost(url: string, host: string): string {
    try {
        const parsedUrl = new URL(url);
        if (parsedUrl.hostname === "localhost") {
            parsedUrl.hostname = host;
        }
        return parsedUrl.toString();
    } catch (error) {
        return url;
    }
}
