# Assumes you're in a git repository
export SENTRY_AUTH_TOKEN=219864168251467bb6c42d89dcd304796f2899cc7bef446cbd41897885b4d8c6
export SENTRY_ORG=fuzlin
export SENTRY_PROJECT=stack

export VERSION=$(npx sentry-cli releases propose-version)

# # Create a release
npx sentry-cli releases new $VERSION

# # Associate commits with the release
npx sentry-cli releases set-commits --auto $VERSION

npx sentry-cli releases files $VERSION upload-sourcemaps ./packages/api/build --rewrite

# # TODO HANDLE SENTRY DEPLOYMENT