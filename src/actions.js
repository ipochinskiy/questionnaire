export const ActionTypes = {
    APP_LOADED:      '[App] App Loaded',
};

export function appLoaded() {
    return {
        type: ActionTypes.APP_LOADED,
    };
}
