const Singleton = (function() {
  let instance;

  function createInstance() {
    return new Object({ name: 'Brad' });
  }

  return {
    getInstance: () => {
      if(!instance) instance = createInstance();
      return instance;
    }
  }
})();

const instanceA = Singleton.getInstance();
const instanceB = Singleton.getInstance();

console.log(instanceA === instanceB);
// console.log(instanceA);