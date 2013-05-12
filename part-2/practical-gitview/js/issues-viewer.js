(function () {
    var IssueViewer = {};
    window.IssueViewer = IssueViewer;

    IssueViewer.Issue = Backbone.Model.extend({
        initialize: function (options) {
            this.urlRoot = 'https://api.github.com/repos/documentcloud/backbone/issues/' + options.number;
        }
    });

    IssueViewer.Issues = Backbone.Collection.extend({
        initialize: function (options) {
            this.url = 'https://api.github.com/repos/documentcloud/backbone/issues?page=' + options.page_num;
        }
    });

    IssueViewer.Comments = Backbone.Collection.extend({
        initialize: function (options) {
            this.url = 'https://api.github.com/repos/documentcloud/backbone/issues/' + options.number + '/comments';
        }
    });

    //IssueList is the view for a listing of a page of issues
    IssueViewer.IssueList = Backbone.View.extend({
        el: '.page',
        render: function (options) {
            var that = this;
            //a single query based on page will return 30 results, but we need to display 25 results. So we either need to query once or twice
            var page_num = options.page_num;

            var issues = new IssueViewer.Issues({
                page_num: options.page_num
            });
            issues.fetch({
                success: function (issues) {
                    var html_append = $('#issue-list-template').html() + "<div><div class='pagination pagination-large'><ul>";
                    //page navigation, list 5 pages
                    if (options.page_num > 1) {
                        html_append += "<li><a href='#/issueList/" + (options.page_num - 1) + "'>Prev</a></li>";
                    }
                    var start_page = Math.max(1, options.page_num - 2);
                    for (var i = start_page; i < start_page + 5; i++) {
                        if (i != options.page_num) {
                            html_append += "<li><a href='#/issueList/" + i + "'>" + i + "</a></li>";
                        } else {
                            html_append += "<li><a style='background-color:#0088CC;color:white' href='#/issueList/" + i + "'>" + i + "</a></li>";
                        }
                    }
                    html_append += "<li><a href='#/issueList/" + (parseInt(options.page_num) + 1) + "'>Next</a></li></ul></div></div>";
                    var template = _.template(html_append, {
                        issues: issues.models
                    });
                    that.$el.html(template);
                }
            })

        }
    });

    //SingleIssue is the view for a single issue plus its comments
    IssueViewer.SingleIssue = Backbone.View.extend({
        el: '.page',
        render: function (options) {
            var that = this;
            if (options.number) {
                var issue = new IssueViewer.Issue({
                    number: options.number
                });
                issue.fetch({
                    success: function (issue) {
                        var comment_numbers = issue.get('comments');
                        //if there exists any comment, then display it
                        if (comment_numbers > 0) {
                            var comments = new IssueViewer.Comments({
                                number: options.number
                            });
                            comments.fetch({
                                success: function (comments) {
                                    var template = _.template($('#single-issue-template').html(), {
                                        issue: issue,
                                        comments: comments.models
                                    });
                                    that.$el.html(template);
                                }
                            });
                        } else {
                            var template = _.template($('#single-issue-template').html(), {
                                issue: issue,
                                comments: null
                            });
                            that.$el.html(template);
                        }
                    }
                })
            } else {
                var template = _.template($('#single-issue-template').html(), {
                    user: null,
                    comments: null
                });
                that.$el.html(template);
            }

        },
    });

    IssueViewer.Router = Backbone.Router.extend({
        routes: {
            '': 'home',
            'issueList/:number': 'issueList',
            'singleIssue/:number': 'singleIssue'
        }
    });

    var issueList = new IssueViewer.IssueList();
    var singleIssue = new IssueViewer.SingleIssue();
    var router = new IssueViewer.Router();

    router.on('route:home', function () {
        issueList.render({
            page_num: 1
        });
    });

    router.on('route:issueList', function (number) {
        issueList.render({
            page_num: number
        });
    });

    router.on('route:singleIssue', function (number) {
        singleIssue.render({
            number: number
        });
    });

    Backbone.history.start();

})()