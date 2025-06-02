#!/bin/bash
cd /home/kavia/workspace/code-generation/quizcraft-16343-d3806edf/quizcraft
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

