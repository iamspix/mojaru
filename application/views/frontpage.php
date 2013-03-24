<div class="navbar navbar-inverse">
    <div class="navbar-inner">

        <div class="nav-collapse collapse">
            <ul class="nav">
                <li>
                    <img class="brand" src="assets/img/rnd-logo.png" height="40" width="40"/>
                </li>
                <li>
                    <h1>Husgahan<b class="blue">blues</b></h1>
                </li>
            </ul>
        </div>
        <div id="current-status" class="span6 pull-right">

        </div>

    </div>
</div>


<div id="container">
    <div id="people-box"></div>
    <hr class="clearfix"/>

    <!-- Modal -->
    <div id="evaluation" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">        
        <div class="modal-body">
            <div class="row">
                <div class="span4">
                    <h2 id="member-to-judge-name"></h2>
                    <h3 id="member-to-judge-division"></h3>
                </div>
                <div class="span3">
                    <img class="img-polaroid pull-right" id="member-to-judge-happy" src="assets/img/aemy-happy.jpg" height="100" width="100"/>
                    <img class="img-polaroid pull-right" id="member-to-judge-sad" src="assets/img/aemy-sad.jpg" height="100" width="100"/>
                </div>

            </div>
            <hr/>

            <h4 id="question-1"></h4>
            <textarea id="answer-1" class ="answer" rows="2" cols="100" placeholder="Pwede mo nang aminin dito na maganda tong taong to.">alpha</textarea>
            <h4 id="question-2"></h4>
            <textarea id="answer-2" class ="answer" rows="2" cols="40" placeholder="Be gentle but frank, this is for their own good. :)">romeo</textarea>
            <h4 id="question-3"></h4>
            <textarea id="answer-3" class ="answer" rows="2" cols="40" placeholder="Oh aking iniirog...">sulut</textarea>

        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
            <button id="evaluate-member" class="btn btn-primary" title="Did you forget to answer a question?">Save changes</button>
        </div>
    </div>

    <div id="introduction" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">        
        <div class="modal-body">
            <div class="row">
                <div class="span5">
                    <h2>Welcome to the final countdown!</h2>
                    <p>The survey is completely anonymous. Makikita ko lang kung sumagot na kayo or hindi pero di ko makikita kung ano ang sinagot niyo for each other. :)</p>
                    <p>Enjoy the summer vacation!</p>
                </div>
            </div>
            <hr/>



        </div>
        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        </div>
    </div>

</div>

