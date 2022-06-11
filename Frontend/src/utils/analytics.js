
let instance = null;

export const setAnalytics = (analyticsInstance) => {
    instance = analyticsInstance;
}

export const getAnalytics = () => instance;

