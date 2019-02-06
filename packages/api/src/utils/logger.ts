import debug from "debug";

export let logApi = debug("fzl").extend("api");
export let logError = logApi.extend("error");
export let logInfo = logApi.extend("info");
export let logTypeorm = logApi.extend("typeorm");
export let logRedis = logApi.extend("redis");

var pid: number | undefined = undefined;

export function initLogger(newPid?: number) {
  if (pid !== undefined) {
    return;
  }

  logApi = debug(`fzl:${newPid}`).extend("api");
  logError = logApi.extend("error");
  logInfo = logApi.extend("info");
  logTypeorm = logApi.extend("typeorm");
  logRedis = logApi.extend("redis");
}
