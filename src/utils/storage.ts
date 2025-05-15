const storage = {
  set: function <T>(key: string, item: T) {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.setItem(key, JSON.stringify(item));
  },

  get: function (key: string) {
    if (typeof window === 'undefined') {
      return null;
    }
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  del: function (key: string) {
    if (typeof window === 'undefined') {
      return;
    }
    localStorage.removeItem(key);
  },
};

export default storage;
