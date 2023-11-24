const loadModule = async () => {
    const module = await import('./lol');
    console.log(module.default())
  };
  
  loadModule();