  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
    $('input #title, textarea #description').characterCounter();

     var data = [{ id: 0, text: 'Technology' }, { id: 1, text: 'Health' }, { id: 2, text: 'Entertainment' },
                  { id: 3, text: 'Media' }, { id: 4, text: 'Household' }];


    $('#problemModal .nextbtn').on('click',function(){
    
          var currentActive = $('#problemModal .tab a.active').parent();
          $('ul.tabs').tabs('select_tab', $(currentActive).next().find('a').attr('href').substring(1));
          var index = $('#problemModal .tab a.active').parent().index();
          console.log(index);
          var width=33.3 *(index+1) + '%';
          $('.progressbar').width(width);
          if(index == $('#problemModal .tab').length-1){
          		$(this).hide();
          		$('#problemModal').find('.submitbtn').show();
          	}
          if(index > 0){
               $('#problemModal .previousbtn').show();
          	}
    });
    $('#problemModal .previousbtn').on('click',function(){
       var currentActive = $('#problemModal .tab a.active').parent();
          $('ul.tabs').tabs('select_tab', $(currentActive).prev().find('a').attr('href').substring(1));
          var index = $('#problemModal .tab a.active').parent().index();
          var width=33.3 *(index+1) + '%';
          $('.progressbar').width(width);
          if(index == 0){
          		$(this).hide();
          	}
          if(index != $('#problemModal .tab').length-1){
               $('#problemModal .submitbtn').hide();
               $('#problemModal .nextbtn').show();
          	} 
		});
      $('#problemModal #tags').on('keyup',function(e){
          console.log(e.keyCode);
          if(e.keyCode == 13 && $(this).val().length > 0){

          }
      });
 });
