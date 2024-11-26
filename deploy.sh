#!/bin/bash

# 프로젝트 목록 배열
projects=("rockpaperscissor_game" "shopping-site" "weather-app")

# deploy 디렉토리 초기화
rm -rf deploy
mkdir deploy

# 각 프로젝트 빌드 및 빌드 파일 복사
for project in "${projects[@]}"; do
  echo "Building $project..."
  cd $project
  npm install
  npm run build
  cd ..

  echo "Copying build files for $project..."
  mkdir -p deploy/$project
  cp -r $project/build/* deploy/$project/
done

# index.html 생성 부분 제거
# 기존의 index.html 파일은 유지됩니다.