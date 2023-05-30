class TimeHelpers {
    static delayAsync = (time_ms) => {
        return new Promise((res) => setTimeout(res, time_ms));
    };
}

export default TimeHelpers;
