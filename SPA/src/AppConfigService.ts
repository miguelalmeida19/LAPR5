// @ts-ignore
import config from '../config.js';

export class AppConfigService {
  static get planApi() {
    return config.PLAN_API_URL;
  }
  static get logiApi() {
    return config.LOGI_API_URL;
  }
  static get wmApi() {
    return config.WM_API_URL;
  }
}
