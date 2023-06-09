const zukeeper = (storeConfig) => {
  return (set, get) => {
    const store = storeConfig(set, get);

    for (let key in store) {
      if (typeof store[key] === "function") {
        let functionDefinition = store[key];

        store[key] = (...args) => {
          let currstate = get();

          window.postMessage({
            body: "Innit",
            state: JSON.stringify(currstate),
          });

          functionDefinition(...args);
          currstate = get();

          window.postMessage({
            body: "Data",
            state: JSON.stringify(currstate),
            actions: key,
          });
        };
      }
    }
    return store;
  };
};

// CJS
module.exports = zukeeper;

// ESM
export default zukeeper;
