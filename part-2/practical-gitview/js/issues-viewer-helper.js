   /**
    *  this function will replace the mentioned github username (starting with @ sign) in the comment body with a link to his/her Github homepage
    **/
   function findAndAddLink(str) {
       return str.replace(/[@]+[A-Za-z0-9-_]+/g, function (u) {
           return u.link("https://github.com/" + u.replace("@", ""));
       });
   }

   /**
    *  this function return first 140 characters of a string (and will get rid of the last broken word)
    **/
   function first140NonBreakingWords(str) {
       return str.substring(0, 140).split(" ").slice(0, -1).join(' ');
   }

   /**
    *  this function return html for the labels, with text and color specified from the API queried object, passed in with name <code>labels</code>
    **/
   function generateLabels(labels) {
       var generated_html = "";
       for (var i = 0; i < labels.length; i++) {
           var color = "color: #" + labels[i]['color'];
           generated_html += ("<div style='" + color + "; display:inline'>" + labels[i]['name'] + "</div>");
       }
       if (labels.length == 0) {
           generated_html += "N/A";
       }
       return generated_html;
   }

   /**
    *  this function return html for the left div, which includes gravatar and may include id number
    **/
   function generateGravatarAndId(url, id) {
       var generated_html = "";
       generated_html += "<div class='span1' style='border: red solid 1px;'>";
       generated_html += "<img style='width=100%' src='" + url + "'></img>";
       if (id > 0) {
           generated_html += "<div>Id: " + id + "</div>";
       }
       generated_html += '</div>';
       return generated_html;
   }

   /**
    *  this function return html for the right div, including username, post title, post content, state and tags 
    **/
   function generateIssuePost(spanSize, username, issue_title, issue_body, issue_hr, issue_state, issue_label) {
       var generated_html = "";
       generated_html += "<div class='" + spanSize + "'>";
       generated_html += "<div class='nameTag'>" + username + "</div>";
       generated_html += '<div class="postContent">';
       if (issue_title != "") {
           generated_html += "<div class='title'>" + issue_title + "</div>";
       }
       generated_html += "<div class='content'><pre>" + issue_body + "</pre></div>";
       if (issue_hr == 1) {
           generated_html += "<hr>";
       }
       if (issue_state != "") {
           generated_html += "<div> State: " + issue_state + "</div>";
       }
       if (issue_label != "") {
           generated_html += "<div> Labels:: " + issue_label + "</div>";
       }
       generated_html += '</div></div>';
       return generated_html;
   }

   /**
    *  this function return html for <code>#issue-list-template</code>
    **/
   function renderIssueListTemplate(issues) {
       var generated_html = "";
       _.each(issues, function (issue) {
           var singleIssueURL = "#/singleIssue/" + issue.get('number');
           generated_html += '<div class="row issues" onclick="location.href=' + "'" + singleIssueURL + "'" + '">';
           generated_html += generateGravatarAndId(issue.get('user').avatar_url, issue.get('number'));
           generated_html += generateIssuePost("span9", issue.get('user').login, issue.get('title'), first140NonBreakingWords(issue.get('body')), 0, "", generateLabels(issue.get('labels')));
           generated_html += "</div>";
       });
       return generated_html;
   }

   /**
    *  this function return html for <code>#single-issue-template</code>
    **/
   function renderSingleIssueTemplate(comments, issue) {
       generated_html = "<div class='row issue'>";
       generated_html += generateGravatarAndId(issue.get('user').avatar_url, -1);
       generated_html += generateIssuePost("span10", issue.get('user').login, issue.get('title'), findAndAddLink(issue.get('body')), 1, issue.get('state'), generateLabels(issue.get('labels')));
       generated_html += "</div>";
       if (comments) {
           generated_html += '<h3 class="comments">Comments:</h3>';
           _.each(comments, function (comment) {
               generated_html += '<div class="row comment">';
               generated_html += generateGravatarAndId(comment.get('user').avatar_url, -1);
               generated_html += generateIssuePost("span10", issue.get('user').login, "", findAndAddLink(comment.get('body')), 0, "", "");
               generated_html += "</div>";
           })
       }
       return generated_html;
   }