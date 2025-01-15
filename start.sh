#!/bin/bash

deno run -A --watch=static/,routes/,util/,data/ --location=http://localhost:8000/ dev.ts

# firefox "http://localhost:8000" &
