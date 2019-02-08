# Assumes you're in a git repository
export SENTRY_AUTH_TOKEN=219864168251467bb6c42d89dcd304796f2899cc7bef446cbd41897885b4d8c6
export SENTRY_ORG=fuzlin

# Create a release
npx sentry-cli releases new $(npx sentry-cli releases propose-version) -p stack

# Associate commits with the release
npx sentry-cli releases set-commits --auto $(npx sentry-cli releases propose-version)