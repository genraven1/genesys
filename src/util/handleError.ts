/* eslint-disable @typescript-eslint/no-explicit-any */
export function getErrorMessage(err: any): string {
    if (err?.response?.data?.message) {
        return err.response.data.message;
    }
    return `$err`
}