npx npm-check-updates -u

rm -rf node_modules
rm package-lock.json 
npm install

git init

git remote add origin https://github.com/saeedhei/project-gallus-garten.git
git remote -v

git add .
git commit -m "structure updated/login added"
git push origin main 

error: src refspec main does not match any
error: failed to push some refs to 'https://github.com/saeedhei/project-gallus-garten.git'
git checkout -b main
git push origin main



git rm -r --cached .
git add .
git commit -m "warnings fixed"
git push origin main




git fetch origin
git checkout main
git merge origin/main
or
git pull origin main


git rm --cached .env
git commit -m "Stop tracking .env"
git push origin main






