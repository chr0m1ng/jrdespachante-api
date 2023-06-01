/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-mutable-exports */
let { default: app_settings } = await import('./app_settings.json', {
    assert: { type: 'json' }
});

if (process.env.NODE_ENV === 'test') {
    const { default: test_settings } = await import('./app_settings.jest.js');
    app_settings = test_settings;
} else if (process.env.NODE_ENV !== 'production') {
    const { default: dev_settings } = await import('./app_settings.dev.json', {
        assert: { type: 'json' }
    });
    app_settings = dev_settings;
}

export default app_settings;
