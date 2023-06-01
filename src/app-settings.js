// eslint-disable-next-line import/no-mutable-exports
let { default: app_settings } = await import('./app_settings.json', {
    assert: { type: 'json' }
});

if (process.env.ENVIRONMENT !== 'production') {
    app_settings = await import('./app_settings.dev.json', {
        assert: { type: 'json' }
    });
    app_settings = app_settings.default;
}

export default app_settings;
