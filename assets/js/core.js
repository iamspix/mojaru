/* 
 * core.js - Core functionality
 */

var Mojaru = {
    init : function(){
        Mojaru.AJAX.checkIfLoggedIn();
        
        Mojaru.AJAX.getMembers(function(){
            Mojaru.UI.displayMembers(Mojaru.bindEvents);            
        });
        
    },
    bindEvents : function(){        
        $('#login-button').click(Mojaru.AJAX.login);
        $('#logout-button').click(Mojaru.AJAX.logout);
        $('#evaluate-member').click(function(){
            Mojaru.AJAX.evaluateMember($(this).attr('value'));            
        });
                
        $('body').tooltip({
            selector: '.active, #evaluate-member'
        });
        
        
        $(document).on('click','.peoples', function(){
            if (Mojaru.Variables.logged_in){
                Mojaru.UI.showEvaluationForm(Mojaru.Variables.members[$(this).attr("id")], $(this));
            }else{
                alert('login');
            }
        });        
    }
}


Mojaru.Variables = {
    baseURL : "index.php/api",
    user_name : "",
    members: [],
    logged_in: false, //either false or student number of person logged in?
    current_user : []
}

Mojaru.AJAX = {
    setup: function(){
        $.ajaxSetup({
            async: false,
            method: 'GET',
            dataType: 'json',
            error: function(){
                alert('err');
            }
        //            beforeSend : function(xhr, status){
        //                //                Not sure???
        //                $('.spinner', $(this).parentNode).show();
        //            },
        //            complete: function(){
        //                $('.spinner').hide();
        //            }
        });
    },
    checkIfLoggedIn : function(){
        $.ajax({
            url: Mojaru.Variables.baseURL + '/checkIfLoggedIn',
            data : {
                request: 'getMembers'
            },
            success : function (data) {
                Mojaru.Variables.current_user = $.parseJSON(data);
                Mojaru.Variables.logged_in = true;
            },
            complete : function(){
                Mojaru.UI.displayUser();
            }
        })
    },
    evaluateMember : function (current_student_number) {
        if (($.trim($('#answer-1').val()) != '') &&
            ($.trim($('#answer-2').val()) != '') &&
            ($.trim($('#answer-3').val()) != '')){
            $.ajax({
                url: Mojaru.Variables.baseURL + '/evaluateMember',
                data : {
                    evaluated: current_student_number,
                    answers: [$('#answer-1').val(), $('#answer-2').val(), $('#answer-3').val()]
                
                },
                success : function (data) {
                    Mojaru.Variables.members[current_student_number].evaluated = true;
                    Mojaru.UI.setMemberAsEvaluated(current_student_number);
                    $('#evaluation').modal('hide');

                }
            })    
        }        
    },
    getMembers : function(f){
        $.ajax({
            url: Mojaru.Variables.baseURL + '/getMembers',
            success : function (data) {
                Mojaru.Variables.members = $.parseJSON(data);               
            },
            complete: function(){
                if (typeof f == "function"){
                    f();
                }
                
                
            }
        })
    },
    login : function(){        
        $.ajax({
            url: Mojaru.Variables.baseURL + '/login',
            data : {                
                username: $('#login-student-number').val(),
                password: $('#login-password').val()
            },
            success : function (data) {                
                Mojaru.Variables.current_user = $.parseJSON(data);
                $('#current-status').hide('slide', {
                    direction:'right'
                }, 500).empty();
                Mojaru.UI.displayUser();
                //                Hindi sync yung pagslide out sa pagpasok
                $('#current-status').show('slide', {
                    direction:'right'
                }, 500);
                Mojaru.Variables.logged_in = true;
                //                nagbububble to!!!                
                $(document).off('click', '#login-button', Mojaru.AJAX.login);
                $(document).on('click','#logout-button', Mojaru.AJAX.logout);
                
                Mojaru.AJAX.getMembers(function(){
                    $.map(Mojaru.Variables.members, function(val, i){                        
                        if(val.evaluated == true){
                            Mojaru.UI.setMemberAsEvaluated(val.student_number);
                        }
                    })
                });
                
                
                
                
                $("#introduction").modal("show");
                
            },
            error: function(xhr, ajaxOptions, thrownError){
                //                Papogi pa dito! :)
                $('#login-button').html("Try again!");
            },
            complete: function(){
            //                alert('aw');
                
            }
        })
        
    },
    logout : function(){
        $.ajax({
            url: Mojaru.Variables.baseURL + '/logout',
            success : function (data) {
                Mojaru.Variables.current_user = data;
                $('#current-status').hide('slide', {
                    direction:'right'
                }, 500).html('');
                Mojaru.UI.displayUser();
                $('#current-status').show('slide', {
                    direction:'right'
                }, 500);
                Mojaru.Variables.logged_in = false;
                
                
                $(document).off('click', '#logout-button', Mojaru.AJAX.logout);
                $(document).on('click', '#login-button', Mojaru.AJAX.login);
                
                
                
                Mojaru.UI.setMembersToDefaults();
            },
            error: function(xhr, ajaxOptions, thrownError){
                //                Papogi pa dito! :)
                $('#login-button').html("Try again!");
            }
        })
        
    }    
}

Mojaru.UI = {
    displayUser : function(){        
        $.get('assets/templates/login.html', {}, function(data){
            $('#current-status').html(Mustache.to_html(data, Mojaru.Variables.current_user));            
        });
    },    
    displayMembers : function(f){        
        var mems = Object.keys(Mojaru.Variables.members);
        $.get('assets/templates/peoples.html', {}, function(data){            
            for (i = 0; i < mems.length; i++){
                if (Mojaru.Variables.members[mems[i]].evaluated == "0"){
                    Mojaru.Variables.members[mems[i]].evaluated = false;
                }
                $('#people-box').append(Mustache.to_html(data, Mojaru.Variables.members[mems[i]]));
            }            
            Mojaru.UI.addHoverToMembers();
        });
        
        if (typeof f == "function"){
            f();
        }
        
    
    },
    addHoverToMembers : function(){
        $('.peoples').hover(function(){
            $(this).animate({
                opacity: 1
            }, function(){
                $('.hover-over', $(this)).show({
                    effect: "slide", 
                    direction:"down"
                });
                $('.member-name, .icon-check', $(this)).addClass('glowing');
            })
        }, function(){            
            $(this).animate({
                opacity: 0.5
            }, 'fast', function (){
                $('.hover-over', $(this)).hide({
                    effect: "slide", 
                    direction:"right"
                });
                $('.member-name, .icon-check', $(this)).removeClass('glowing');
            });
            
        });
    },
    setMemberAsEvaluated: function(current_student_number){
        $('#' + current_student_number).addClass('active')
        .attr('title', 'You evaluated '+ Mojaru.Variables.members[current_student_number].nick +' already!')
        //        .attr('data-toggle', 'tooltip')
        .append('<p class="check-placeholder text-right"><i class="icon-check"></i></p>')
        ;
        Mojaru.Variables.members[current_student_number].evaluated = true;
        
        //        WTF TO TOOLTIPS ???
        //        Pag popover gumagana pero naglalagay ng parehong tooltipls plus popover
        //        Add tooltip makulit to eh
        //        $('body').tooltip({
        //            selector: '#' + current_student_number,
        //            title: 'You evaluated '+ Mojaru.Variables.members[current_student_number].nick +' already!'
        //        });
        
        $('#' + current_student_number).tooltip('show');
    //            $('#' + current_student_number).popover({placement : 'bottom'});
        
    },
    setMembersToDefaults : function(){
        $('.peoples').removeClass('active').removeAttr('title');
        $('.check-placeholder').remove();
    },
    showEvaluationForm : function(current_student, containingDiv){
        if (current_student.evaluated == false){            
            $("#evaluation").modal("show");
            $('#member-to-judge-name').html(current_student.first_name + " " + current_student.last_name);
            $('#member-to-judge-division').html(current_student.division);            
            $('#question-1').html("What are " + current_student.nick +'\'s strengths as an R&D member?');
            $('#question-2').html("In what way could " + current_student.nick +' improve as an R&D member?');
            $('#question-3').html("Please write down your messages for " + current_student.nick +'.');
            $('#member-to-judge-happy').attr("src", "assets/img/"+current_student.nick.toLowerCase()+"-happy.jpg");
            $('#member-to-judge-sad').attr("src", "assets/img/"+current_student.nick.toLowerCase()+"-sad.jpg");
            $('#evaluate-member').attr('value', current_student.student_number);
            $('.answer').val('');
        }   
    }
}

$(document).ready(Mojaru.init);



