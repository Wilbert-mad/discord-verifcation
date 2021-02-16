#!/bin/bash

set -eo pipefail

cd $GITHUB_WORKSPACE
REPO="https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
BRANCH_OR_TAG=`awk -F/ '{print $2}' <<< $GITHUB_REF`
CURRENT_BRANCH=`awk -F/ '{print $NF}' <<< $GITHUB_REF`

if [ "$BRANCH_OR_TAG" == "heads" ]; then
  SOURCE_TYPE="branch"
else
  SOURCE_TYPE="tag"
fi

echo "::[notice] # Checkout the repo in the target branch so we can build and push to it"
TARGET_BRANCH="build"
git clone $REPO out -b $TARGET_BRANCH

echo "::[notice] # Install TypeScript"
npm install typescript

echo "::[notice] # Run the build"
npm run build

if [ -d "./src" ]; then
  # Take action if $DIR exists. #
  echo "::[notice] Deleting src dir"
  rm -r src
fi

echo "::[notice] # Commit and push"
git pull
cd out
git add .
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git commit -m "Build for ${SOURCE_TYPE} ${CURRENT_BRANCH}: ${GITHUB_SHA}" || true
git push origin $TARGET_BRANCH
