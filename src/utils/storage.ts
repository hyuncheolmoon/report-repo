
const storage = {
    set: function (key: string, item: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, item);
        }
    },

    get: function (key: string) {
        if (typeof window !== 'undefined') {
            return localStorage.getItem(key);
        }
        return null;
    },

    del: function (key: string) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    },
};

export default storage;