var zukeeper = function (storeConfig) {
    return function (set, get) {
        var store = storeConfig(set, get);
        var _loop_1 = function (key) {
            if (typeof store[key] === "function") {
                var functionDefinition_1 = store[key];
                store[key] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var currstate = get();
                    window.postMessage({
                        body: "Innit",
                        state: JSON.stringify(currstate),
                    });
                    functionDefinition_1.apply(void 0, args);
                    currstate = get();
                    window.postMessage({
                        body: "Data",
                        state: JSON.stringify(currstate),
                        actions: key,
                    });
                };
            }
        };
        for (var key in store) {
            _loop_1(key);
        }
        return store;
    };
};
module.exports = zukeeper;
export default zukeeper;
//# sourceMappingURL=index.js.map