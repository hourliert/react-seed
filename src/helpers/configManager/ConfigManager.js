import warning from 'warning';

let internalConfig = {};

export class ConfigManager {
  constructor(config = {}) {
    internalConfig = config;
  }

  setConfig(config) {
    Object.assign(internalConfig, config);
  }

  get config() {
    return internalConfig;
  }

  get(key) {
    if (key in internalConfig) {
      return internalConfig[key];
    }

    return warning(false, `Global config: ${key} has not been configured.`);
  }

  remove(key) {
    if (key in internalConfig) {
      return delete internalConfig[key];
    }

    return warning(false, `Global config: ${key} has not been configured.`);
  }
}

export default new ConfigManager();
