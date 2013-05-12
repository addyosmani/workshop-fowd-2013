Spacebook
==============

1. 'walkthrough': Setup your initial Sign-up views by walking through the code in 'walkthrough'. This part of the tutorial provides you the code needed to build up your views in 'walk/01.js' through to 'walk/08.js'. Start by defining the initial router, move on to defining the user model, the sign-up view and initialization. 

To begin, open up index.html and change study the changes as you switch between 01.js to 02.js and so on. Review how these change the application in the browser. For a preview of the final app we'll be building later on, check out final_source.js

2. '1-posts': moving on from our walkthrough we will now add in the code needed to create and post to our Spacebook Timeline. Pay attention to CreateStatusView, getNewPostId, PostCollection and PostView.

3. '2-likes': we'll now add the ability to add new likes to a post. Review PostModel, PostView and any other changes needed to bring like capabilities to the application.

4. '3-comments': finally, we'll add commenting to our posts. Review CreateCommentView, CommentCollection, CommentView, CommentCollectionView and the other changes needed to add commenting to the application. 

Bonus
===============

If you would like to explore RequireJS and Tooling, but don't think you'll have time for the Kitlers tutorial, you could use [Yeoman](http://yeoman.io) and [Generator-Backbone](https://github.com/yeoman/generator-backbone) to scaffold out RequireJS + Backbone pieces for your app and try
to modularize the Spacebook app we just looked at. e.g:

$ yo bbb:view Signup
$ yo bbb:view CreateStatus
$ yo bbb:model User
$ yo bbb:model Post
$ yo bbb:collection Post
$ yo bbb:view Post