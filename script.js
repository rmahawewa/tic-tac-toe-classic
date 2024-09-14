function proceed(element){
    this.element = element;
    const make_visible = () => {
        document.querySelector(element).setAttribute("style", "opacity: 1; z-index:1");
    }

    const make_invisible = () => {
        document.querySelector(element).setAttribute("style", "opacity: 0; z-index:-1000");
    }

    const make_focus = () => {
        document.querySelector(element).focus();
    }

    const add_content = (content) => {
        document.querySelector(element).innerHTML = content;
    }

    const change_value = (v) => {
        document.querySelector(element).value = v;
    }

    let get_value = () => {
        return (document.querySelector(element).value);
    }

    const get_element = () => {
        return (document.querySelector(element));
    }

    const get_element_group = () => {
        return (document.querySelectorAll(element));
    }

    const get_element_id = () => {
        return (element.id);
    }

    return {element, make_visible, make_invisible, make_focus, add_content, change_value, get_value, get_element, get_element_group, get_element_id};
}

function player(player, sign){ 
    let player_code = player;
    let mark = sign;
    let cnt = -1;
    const moves = [0,0,0,0,0,0,0,0,0];

    const reset_moves = () => {
        moves.forEach((v,i) => moves[i] = 0);
    }

    let first_move = (gb, m) => {
        let mrk = 1;
        console.log("mark: " + m);
        if(m.localeCompare("X")===0){
            add_sign(gb, m);
            mrk = 0;
        }
        return mrk;
    }

    const click_start = () => {
        const interface_get_user_name = proceed("#model-get-user");
        interface_get_user_name.make_visible();
    }

    const focus_username_input = () => {
        const user_name = proceed("#user-name");
        user_name.make_focus();
    }

    const get_username_button_click = () => {
        let user = proceed("#user-name").get_value();
        proceed("#user-name").change_value("");
        user = user.localeCompare("") === 0?"player one":user;
        const interface_get_user_name = proceed("#model-get-user");
        interface_get_user_name.make_invisible();
        const interface_select_symbol = proceed("#model-get-sign");
        interface_select_symbol.make_visible();
        return user;
    }

    const get_user_symbol = () => {
        let symbols = proceed(".symbol").get_element_group();
        return symbols;
    } 

    const get_player_data = () => {
        document.querySelector("#model-get-user").setAttribute("style","opacity: 1; z-index:1");
        let usr = document.querySelector("#user-name");
        usr.focus();     
    }

    const get_player_mark_button_click = (s) => {
        let mrk = proceed(s).get_element_id();
        const interface_select_symbol = proceed("#model-get-sign");
        interface_select_symbol.make_invisible();
        return mrk;
    }

    let get_space = (gb) => {
        let get_indexes = gb.gameboard.map((v, i) => i);
        let free_space = get_indexes.filter(i => gb.gameboard[i].localeCompare("") == 0);
        let length = free_space.length;
        let random_number = -1;
        if(length > 0){
            random_number = Math.floor((Math.random()*(length-1)));
        }
        return free_space[random_number];
    }

    let add_sign = (gb, mrk) => {
        let indx = get_space(gb);
        if(indx > -1){
            console.log("test");
            gb.add(indx, mrk);
            moves[indx]=1;
            console.log(moves);
        }
        console.log(gb.gameboard);
        gb.draw_board();
        return indx;
    }

    let gameboard_click = (gb, index, symbl) => {
        gb.add(index, symbl);
        gb.draw_board();
        moves[index] = 1;
        console.log(moves);
    }

    return {player_code, mark, cnt, moves, get_player_data, click_start, focus_username_input, get_username_button_click, get_user_symbol, get_player_mark_button_click, get_space, add_sign, first_move, gameboard_click, reset_moves};
}

function conclution(gb,moves){
    let concl = () => {
        //0 - continue
        //1 - won
        //2 - draw
        for(let i=0; i<9; i=i+3){
            if(moves[i]===1 && moves[i+1]===1 && moves[i+2]===1){
                return 1;
            }
        }
        for(let i=0; i<3; i++){
            if(moves[i]===1 && moves[i+3]===1 && moves[i+6]===1){
                return 1;
            }
        }
        if(moves[0]===1 && moves[4]===1 && moves[8]===1){
            return 1;
        }
        if(moves[2]===1 && moves[4]===1 && moves[6]===1){
            return 1;
        }  
        console.log(gb);  
        return gb.check_empty();
    }   
    return {concl}; 
}

function game_board(){
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    let gb = [10, 10, 10, 10, 10, 10, 10, 10, 10]

    const reset_gameboard = () => {
        gameboard.forEach((v,i) => gameboard[i] = "");
        gb.forEach((v,i) => gb[i] = 10);
        draw_board();
    }

    const add = (index, sign) => {
        gameboard[index] = sign;
        gb[index] = sign.localeCompare("X") === 0?1:-1;
        console.log(gb);
    }

    const check_empty = () => {
        
        let is_empty = 2;
        gameboard.forEach((v,i) => {
            console.log("the value is:- " + v);
            if(!((v.localeCompare("X")===0) || (v.localeCompare("O")===0))){
                is_empty = 0;
                return;
            }
        });
        console.log(is_empty);
        return is_empty;
    }

    const draw_board = () => {
        document.querySelector("#btn-one").innerHTML = gameboard[0];
        document.querySelector("#btn-two").innerHTML = gameboard[1];
        document.querySelector("#btn-three").innerHTML = gameboard[2];
        document.querySelector("#btn-four").innerHTML = gameboard[3];
        document.querySelector("#btn-five").innerHTML = gameboard[4];
        document.querySelector("#btn-six").innerHTML = gameboard[5];
        document.querySelector("#btn-seven").innerHTML = gameboard[6];
        document.querySelector("#btn-eight").innerHTML = gameboard[7];
        document.querySelector("#btn-nine").innerHTML = gameboard[8];
    }

    return {gameboard, add, draw_board, reset_gameboard, check_empty};
}

function message_view(outer, inner, content, time_out){
    const view_message = () => {
        let outer_cont = proceed(outer);
        let inner_cont = proceed(inner);
        inner_cont.add_content(content);
        outer_cont.make_visible();
    
        setTimeout(() => {
            inner_cont.add_content("");
            outer_cont.make_invisible();
        }, time_out);
    }
    return {view_message};
}

function conclude_game(stts, player){
    let message_content = "";
    if(stts === 1){
        message_content = player + " wins the game";
        message_view("#message", "#view-msg", message_content, 3000).view_message();
    }
    if(stts === 2){
        message_content = "Game draw";
        message_view("#message", "#view-msg", message_content, 3000).view_message();
    }
    if(stts === 1 || stts === 2){
        reset_game();
    }
}

// function gameboard(){
//     const game_board = 
// }