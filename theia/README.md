Building
First, install all dependencies.

yarn
Second, use Theia CLI to build the application.

yarn theia build
yarn looks up theia executable provided by @theia/cli in the context of our application and then executes the build command with theia. This can take a while since the application is built in production mode by default, i.e. obfuscated and minified.

Running
After the build is finished, we can start the application:

yarn theia start
You can provide a workspace path to open as a first argument and --hostname, --port options to deploy the application on specific network interfaces and ports, e.g. to open /workspace on all interfaces and port 8080:

yarn theia start /my-workspace --hostname 0.0.0.0 --port 8080