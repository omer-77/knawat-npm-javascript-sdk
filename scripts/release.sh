#!/bin/bash

git checkout master
git pull

npm version $1

git push
git push --tag
