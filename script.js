(function($){
	$(document).ready(function(){
        $(document).on('click','.board td:has(i)',function(){
            el=$(this).find('i');
            white=el.hasClass('white');

            if($(document).find('.move').hasClass('white') == white){
                return false;
            }

            if(
                $(document).find('.active').length &&
                !$(this).hasClass('next-step') &&
                !$(this).hasClass('fight')
                ){
                $(document).find('.active').removeClass('active');
                $(document).find('.fight').removeClass('fight');
                $(document).find('.next-step').removeClass('next-step').html('');
                return false;
            }
            
            el.addClass('active');    
            x=$(this).index();
            y=$(this).closest('tr').index();

            if(el.hasClass('fa-chess-pawn')){chess='pawn';}
            if(el.hasClass('fa-chess-rook')){chess='rook';}
            if(el.hasClass('fa-chess-knight')){chess='knight';}
            if(el.hasClass('fa-chess-bishop')){chess='bishop';}
            if(el.hasClass('fa-chess-queen')){chess='queen';}
            if(el.hasClass('fa-chess-king')){chess='king';}

            if(chess=='pawn'){
                stepPawn(x,y,white);
            }
            if(chess=='rook'){
                limit=0;
                stepVertical(x,y,limit,white);
                stepHorizontal(x,y,limit,white);
            }
            if(chess=='knight'){
                limit=0;
                stepKnight(x,y,limit,white);
            }
            if(chess=='bishop'){
                limit=0;
                stepDiagonal(x,y,limit,white);
            }
            if(chess=='queen'){
                limit=0;
                stepVertical(x,y,limit,white);
                stepHorizontal(x,y,limit,white);
                stepDiagonal(x,y,limit,white);
            }
            if(chess=='king'){
                limit=1;
                stepVertical(x,y,limit,white);
                stepHorizontal(x,y,limit,white);
                stepDiagonal(x,y,limit,white);
            }
        });

        function stepPawn(x,y,white){
            if(white){
                if(y<6){
                    min_y=y-1;
                }else{
                    min_y=y-2;
                }
                max_y=y;

                for(xx=x-1, yy=y-1; xx >= x-1, yy >= y-1; xx--, yy--){
                    if(xx>=0 && yy>=0){
                        if(!isEmpty(xx, yy)){
                            $('table tr:eq('+yy+') td:eq('+xx+')').addClass('fight');
                        }
                    }
                }
                for(xx=x+1, yy=y-1; xx <= x+1, yy >= y-1; xx++, yy--){
                    if(yy>=0){
                        if(!isEmpty(xx, yy)){
                            $('table tr:eq('+yy+') td:eq('+xx+')').addClass('fight');
                        }
                    }
                }
            }else{
                if(y>1){
                    max_y=y+1;
                }else{
                    max_y=y+2;
                }
                min_y=y;
                
                
                for(xx=x+1, yy=y+1; xx <= x+1, yy <= y+1; xx++, yy++){
                    if(!isEmpty(xx, yy)){
                        $('table tr:eq('+yy+') td:eq('+xx+')').addClass('fight');
                    }
                }
                for(xx=x-1, yy=y+1; xx >= x-1, yy <= y+1; xx--, yy++){
                    if(xx>=0){
                        if(!isEmpty(xx, yy)){
                            $('table tr:eq('+yy+') td:eq('+xx+')').addClass('fight');
                        }
                    }
                }
            }

            for (yy=y-1; yy >= min_y; yy--){
                if(isEmpty(x, yy)){
                    $('table tr:eq('+yy+') td:eq('+x+')').addClass('next-step').html('<i class="fa-sharp fa-solid fa-circle-dot"></i>');
                }
            }
            for (yy=y+1; yy <= max_y; yy++){
                if(isEmpty(x, yy)){
                    $('table tr:eq('+yy+') td:eq('+x+')').addClass('next-step').html('<i class="fa-sharp fa-solid fa-circle-dot"></i>');
                }
            }

        }

        function stepKnight(x,y,limit,white){
                doSome(x+2,y+1,white);
                doSome(x+2,y-1,white);
                doSome(x+1,y+2,white);
                doSome(x+1,y-2,white);

                doSome(x-2,y+1,white);
                doSome(x-2,y-1,white);
                doSome(x-1,y+2,white);
                doSome(x-1,y-2,white);
        }

        function stepVertical(x,y,limit,white){
            if(limit != 0){
                min_y=y-limit;
                max_y=y+limit;
            }else{
                min_y=0;
                max_y=7;
            }
            for (yy=y-1; yy >= min_y; yy--){
                if(!doSome(x,yy,white)){
                    break;
                }
            }
            for (yy=y+1; yy <= max_y; yy++){
                if(!doSome(x,yy,white)){
                    break;
                }
            }
        }
        function stepHorizontal(x,y,limit,white){
            if(limit != 0){
                min_x=x-limit;
                max_x=x+limit;
            }else{
                min_x=0;
                max_x=7;
            }
            for(xx=x-1;xx >= min_x; xx--){
                if(!doSome(xx,y,white)){
                    break;
                }
            }
            for(xx=x+1;xx <= max_x; xx++){
                if(!doSome(xx,y,white)){
                    break;
                }
            }
        }
        function stepDiagonal(x,y,limit,white){
            if(limit != 0){
                min_x=x-limit;
                min_y=y-limit;
                max_x=x+limit;
                max_y=y+limit;
            }else{
                min_x=0;
                min_y=0;
                max_x=7;
                max_y=7;
            }

            for(xx=x+1, yy=y+1; xx <= max_x, yy <= max_y; xx++, yy++){
                if(!doSome(xx,yy,white)){
                    break;
                }
            }
            for(xx=x-1, yy=y-1; xx >= min_x, yy >= min_y; xx--, yy--){
                if(xx>=0 && yy>=0){
                    if(!doSome(xx,yy,white)){
                        break;
                    }
                }
            }
            for(xx=x+1, yy=y-1; xx <= max_x, yy >= min_y; xx++, yy--){
                if(yy>=0){
                    if(!doSome(xx,yy,white)){
                        break;
                    }
                }
            }
            for(xx=x-1, yy=y+1; xx >= min_x, yy <= max_y; xx--, yy++){
                if(xx>=0){
                    if(!doSome(xx,yy,white)){
                        break;
                    }
                }
            }
        }

        function doSome(x,y,white){
            if(isEmpty(x,y)){
                $('table tr:eq('+y+') td:eq('+x+')').addClass('next-step').html('<i class="fa-sharp fa-solid fa-circle-dot"></i>');
            }else{
                if(canFight(x,y,white)){
                    $('table tr:eq('+y+') td:eq('+x+')').addClass('fight');
                }
                return false;
            }
            return true;
        }
        
        function isEmpty(x, y){
            if($('table tr:eq('+y+') td:eq('+x+')').html() == ''){
                return true;
            }else{
                return false;
            }
        }
        function canFight(x,y,white){
            if(! $(document).find('table tr:eq('+y+') td:eq('+x+')').hasClass('next-step')){
                white_tmp=$(document).find('table tr:eq('+y+') td:eq('+x+') i').hasClass('white');
                if(white == white_tmp){
                    return false;
                }else{
                    return true;
                }
            }
        
        }

        function score(){
            $(document).find('.summary i').each(function(){
                x=$(this).closest('td').index();
                y=$(this).closest('tr').index()+1;
                classes=$(this).attr('class');
                max=$(this).attr('max');
                count=$(document).find('.board .'+classes.replace(/\s+/g, '.')).length;
                $(this).closest('table').find('tr:eq('+y+') td:eq('+x+')').html(max - count);
            })
        }
    
        $(document).on('click','.next-step,.fight',function(){
            element=$(document).find('.active');
            white=element.hasClass('white');
            $(document).find('.active').removeClass('active');
            $(document).find('.fight').removeClass('fight');
            $(document).find('.next-step').removeClass('next-step').html('');

            $(this).html('').html(element.parent().html());
            element.parent().html('');

            
            if(white){
                $(document).find('.summary.black').removeClass('move');
                $(document).find('.summary.white').addClass('move');
            }else{
                $(document).find('.summary.white').removeClass('move');
                $(document).find('.summary.black').addClass('move');
            }
            score();
        });
  });
  
})(jQuery);
