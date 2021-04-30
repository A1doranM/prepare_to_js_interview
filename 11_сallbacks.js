var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

function getThen(value) {
    console.log("GETTHEN: ", value);
    var t = typeof value;
    if (value && (t === 'object' || t === 'function')) {
        var then = value.then;
        if (typeof then === 'function') {
            return then;
        }
    }
    return null;
}

function doResolve(fn, onFulfilled, onRejected) {
    console.log("DORESOLVE: ", fn, onFulfilled, onRejected);
    var done = false;
    try {
        fn(function (value) {
            if (done) return;
            done = true;
            onFulfilled(value);
        }, function (reason) {
            if (done) return;
            done = true;
            onRejected(reason);
        })
    } catch (ex) {
        if (done) return;
        done = true;
        onRejected(ex);
    }
}

function Promise(fn) {
    // store state which can be PENDING, FULFILLED or REJECTED
    var state = PENDING;

    // store value once FULFILLED or REJECTED
    var value = null;

    // store sucess & failure handlers
    var handlers = [];

    function fulfill(result) {
        console.log("FULLFILL: ", result);
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        console.log("REJECT: ", error);
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    function resolve(result) {
        try {
            console.log("RESOLVE: ", result);
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject);
                return
            }
            fulfill(result);
        } catch (e) {
            reject(e);
        }
    }

    function handle(handler) {
        console.log("HANDLE: ", handler);
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (state === FULFILLED &&
                typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (state === REJECTED &&
                typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        }
    }

    this.done = function (onFulfilled, onRejected) {
        console.log("DONE: ", onFulfilled, onRejected);
        // ensure we are always asynchronous
        setTimeout(function () {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            });
        }, 0);
    };

    this.then = function (onFulfilled, onRejected) {
        console.log("THEN: ", onFulfilled, onRejected);
        var self = this;
        return new Promise(function (resolve, reject) {
            return self.done(function (result) {
                if (typeof onFulfilled === 'function') {
                    try {
                        return resolve(onFulfilled(result));
                    } catch (ex) {
                        return reject(ex);
                    }
                } else {
                    return resolve(result);
                }
            }, function (error) {
                if (typeof onRejected === 'function') {
                    try {
                        return resolve(onRejected(error));
                    } catch (ex) {
                        return reject(ex);
                    }
                } else {
                    return reject(error);
                }
            });
        });
    };

    doResolve(fn, resolve, reject);
}


let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // переведёт промис в состояние fulfilled с результатом "result"
        resolve("result");
    }, 1000);
    // reject("Test error");
});


promise.then((response) => {
    console.log("Log: ", response);
}, (reject) => {
    console.log("Log reject: ", reject);
});
