const request = require('request-json');
const semver = require('semver');
const env = process.env;

var tag; //eslint-disable-line
var projectName; //eslint-disable-line
var url; //eslint-disable-line

function checkEnvVar(name) {
  if (!env[name]) {
    console.log(`Missing: ${name}. Skip`); //eslint-disable-line
    return false;
  }

  return true;
}

if (env.CI_BUILD_REF_NAME === 'develop') {
  tag = 'develop';
  projectName = 'staging';

  if (!checkEnvVar('DEPLOY_DEV_URL')) process.exit(-1);
  url = env.DEPLOY_DEV_URL;
} else if (!!semver.valid(env.CI_BUILD_TAG)) {
  tag = env.CI_BUILD_TAG;
  projectName = 'prod';

  if (!checkEnvVar('DEPLOY_URL')) process.exit(-1);
  url = env.DEPLOY_URL;
}

if (!tag) {
  console.log('Missing tag value'); //eslint-disable-line
  process.exit(-1);
}

if (!checkEnvVar('REGISTRY')) process.exit(-1);
if (!checkEnvVar('DEPLOY_KEY')) process.exit(-1);

const data = {
  gitUrl: env.REPO_URL,
  deployKey: env.DEPLOY_KEY,
  registry: env.REGISTRY,
  registryLogin: env.REGISTRY_LOGIN,
  registryPassword: env.REGISTRY_PASSWORD,
  registryEmail: env.REGISTRY_EMAIL,
  webhookToken: env.DEPLOY_TOKEN,
  projectName: projectName, //eslint-disable-line
  imageVersion: tag,
};

console.log(`Sending webhook to ${url}/deploy. Deploying: ${projectName} from docker-compose.yml`); //eslint-disable-line
const client = request.createClient(url);
client.post('/deploy', data, {
  timeout: 1800000,
}, function callback(err, res, body) {
  if (err) {
    console.log(err.message);//eslint-disable-line
    return process.exit(-1);
  } else if (res.statusCode < 200 || res.statusCode > 400) {
    console.log(res.statusCode); //eslint-disable-line
    return process.exit(-1);
  }

  if (body.error) {
    console.log(`Error in hook: ${body.error}`); //eslint-disable-line
    console.log('Output:'); //eslint-disable-line
    console.log(body.output.trim()); //eslint-disable-line
    process.exit(-1);
  }

  console.log(body.output.trim()); //eslint-disable-line
  return console.log(res.statusCode); //eslint-disable-line
});
