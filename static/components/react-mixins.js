function throttle(func, ms) {
    var timeout, last = 0
    return function() {
        var a = arguments,
            t = this,
            now = +(new Date),
            exe = function() {
                last = now;
                func.apply(t, a)
            }
        clearTimeout(timeout);
        (now >= last + ms) ? exe() : timeout = setTimeout(exe, ms)
    }
}

var IgnoreUnmount = {
    componentWillMount: function() {
        this._replaceState = this.replaceState
        this.replaceState = function(completeState, callback) {
            if (!this.isMounted()) {
                return;
            }
            this._replaceState(completeState, callback);
        }
    }
};

var OnResize = {
    getInitialState: function() {
        var defaults = {
            window: {
                height: 0,
                width: 0
            },
            document: {
                height: 0,
                width: 0
            }
        };
        return !this.onResize ? defaults : null;
    },

    componentDidMount: function() {
        if (!this.onResize) {
            this.onResize = function() {
                this.setState({
                    window: {
                        height: window.innerHeight,
                        width: window.innerWidth
                    },
                    document: {
                        height: document.body.clientHeight,
                        width: document.body.clientWidth
                    }
                });
            }.bind(this);
        }

        this.onResize();
        this.onResizeThrottled = throttle(this.onResize, 10);
        window.addEventListener("resize", this.onResizeThrottled);
    },

    componentWillUnmount: function() {
        window.removeEventListener("resize", this.onResizeThrottled);
    }
};

var OnScroll = {
    getInitialState: function() {
        return !this.onScroll ? {
            scroll: {
                x: 0,
                y: 0
            }
        } : null;
    },

    componentDidMount: function() {
        if (!this.onScroll) {
            this.onScroll = function() {
                this.setState({
                    scroll: {
                        x: window.pageXOffset,
                        y: window.pageYOffset
                    }
                });
            }.bind(this);
        }

        this.onScroll();
        this.onScrollThrottled = throttle(this.onScroll, 10);
        window.addEventListener("scroll", this.onScrollThrottled);
    },

    componentWillUnmount: function() {
        window.removeEventListener("scroll", this.onScrollThrottled);
    }
};

var OnUnload = {
    componentDidMount: function() {
        if (this.onUnload) {
            window.addEventListener("unload", this.onUnload);
        }
        if (this.onBeforeUnload) {
            window.addEventListener("beforeunload", this.onBeforeUnload);
        }
    },

    componentWillUnmount: function() {
        if (this.onUnload) {
            window.removeEventListener("unload", this.onUnload);
        }
        if (this.onBeforeUnload) {
            window.removeEventListener("beforeunload", this.onBeforeUnload);
        }
    }
};