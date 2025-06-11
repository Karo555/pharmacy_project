declare const api: {
    post: (url: string, data: any) => Promise<{ data: { token: string } }>;
};
export default api;