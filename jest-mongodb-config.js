const config = {
    mongodbMemoryServerOptions: {
        binary: {
            version: '4.0.3',
            skipMD5: true
        },
        autoStart: false,
        instance: {}
    },
    useSharedDBForAllJestWorkers: false
};

export default config;
