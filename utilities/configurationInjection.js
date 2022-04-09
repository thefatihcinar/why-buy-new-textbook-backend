import * as fs from 'fs'

class ConfigurationInjector {
  /* this class collects all the configurations and 
    injects them into the application */

  #configurations = {};

  #readConfigurationFiles(){
    /* this method will read all the configuration files and 
      store them in the configurations object */
    
    const imageConfigs = JSON.parse( fs.readFileSync('./configurations/imageConfigurations.json', 'utf8'));
    const appConfigs = JSON.parse( fs.readFileSync('./configurations/applicationConfigurations.json', 'utf8'));
    const authConfigs = JSON.parse( fs.readFileSync('./configurations/authenticationConfigurations.json', 'utf8'));
    
    /* Store those keys in the configurations object */
    Object.keys(imageConfigs).forEach(key => {
      this.#configurations[key] = imageConfigs[key];
    });

    Object.keys(appConfigs).forEach(key => {
      this.#configurations[key] = appConfigs[key];
    });

    Object.keys(authConfigs).forEach(key => {
      this.#configurations[key] = authConfigs[key];
    });

  }
  
  constructor() {
    /* read all the configuration files store them in an object */
    this.#readConfigurationFiles();
  }

  getConfig(key) {
    /* when a key is provided, 
       this method finds the necessary configuration in all of the 
       differen configuration files */
    return this.#configurations[key];
  }
}

export default ConfigurationInjector;