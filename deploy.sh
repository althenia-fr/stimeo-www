#!/bin/bash
 #npm run build
 gcloud auth login  admin@althenia.fr
 gcloud config set project stimeo-www-20260113
 gcloud app deploy ./app.yaml -v 1
