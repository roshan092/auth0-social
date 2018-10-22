#!/usr/bin/env bash
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
aws s3 cp dist s3://souzalobos.com/${PACKAGE_VERSION} --recursive
aws s3 rm s3://souzalobos.com/latest --recursive
aws s3 cp s3://souzalobos.com/${PACKAGE_VERSION} s3://souzalobos.com/latest --recursive
aws cloudfront create-invalidation --distribution-id E3QQCSBL8ISHSZ --paths "/*"
