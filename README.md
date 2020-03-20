
#auth tutorials 
jwt
https://www.youtube.com/watch?v=_EP2qCmLzSE&list=PL55RiY5tL51q4D-B63KBnygU6opNPFk_q&index=11
passport
https://www.youtube.com/watch?v=IlpU1z3cvSQ&list=PLBpijX9DhBeC89GHAJOtrK92hWaSFmg4n&index=1


#git setup
git init
-- Link to GitHub hosted repos

git remote add origin https://github.com/sheikhmavin006/node-app.git
git pull origin master

-- Add some files

git add .
git commit -m "YOUR COMMENTS"
git push origin master

//branch
Create the branch on your local machine and switch in this branch :

$ git checkout -b [name_of_your_new_branch]
Push the branch on github :

$ git push origin [name_of_your_new_branch]
When you want to commit something in your branch, be sure to be in your branch. Add -u parameter to set-upstream.

You can see all the branches created by using :

$ git branch -a
Which will show :

* approval_messages
  master
  master_clean
Add a new remote for your branch :

$ git remote add [name_of_your_remote] [name_of_your_new_branch]
Push changes from your commit into your branch :

$ git push [name_of_your_new_remote] [url]
Update your branch when the original branch from official repository has been updated :

$ git fetch [name_of_your_remote]
Then you need to apply to merge changes if your branch is derivated from develop you need to do :

$ git merge [name_of_your_remote]/develop
Delete a branch on your local filesystem :

$ git branch -d [name_of_your_new_branch]
To force the deletion of local branch on your filesystem :

$ git branch -D [name_of_your_new_branch]
Delete the branch on github :

$ git push origin :[name_of_your_new_branch]
The only difference is the: to say delete, you can do it too by using GitHub interface to remove branch: https://help.github.com/articles/deleting-unused-branches.

If you want to change default branch, it's so easy with GitHub, in your fork go into Admin and in the drop-down list default branch choose what you want.

If you want create a new branch:

$ git branch <name_of_your_new_branch>

#Express
cli: express-generatior
