var SetIntervalAndTimeoutsMixin = {
  componentWillMount: function() {
    this.intervals = [];
    return this.timeouts = [];
  },
  setTimeout: function() {
    return this.timeouts.push(setTimeout.apply(null, arguments));
  },
  setInterval: function() {
    return this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.map(clearInterval);
    return this.timeouts.map(clearTimeout);
  }
};