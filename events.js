// var script = document.createElement('script');
// script.src = './script.js';
// document.body.appendChild(script);

let player1 = player("player one", "O");
let computer = player("computer", "X");
let count = 0;

let start = proceed("#start-btn").get_element();
let reset = proceed("#reset-btn").get_element();
let get_user_button = proceed("#btn-get-usr").get_element();
let user_name = proceed("#user-name").get_element();
let get_symbols = proceed(".symbol").get_element_group();

let gameboard = game_board();
let board_buttons = proceed(".board-btns").get_element_group();

let message_modal = proceed("#message").get_element();
let message = proceed("#view-msg").get_element();

let stts_comp = 0;

start.addEventListener("click", function(){
    console.log("button clicked");
    count = 0;
    player1 = player("player one", "O");
    computer = player("computer", "X");
    stts_comp = 0;
    gameboard.reset_gameboard();
    player1.click_start();
    player1.focus_username_input();
});

reset.addEventListener("click", function(){
    reset_game();
    begin();
})

function reset_game(){
    count=0;
    stts_comp = 0;
    gameboard.reset_gameboard();
    player1.reset_moves();
    computer.reset_moves();
}

get_user_button.addEventListener("click", function(){
    player1.player_code = player1.get_username_button_click();
    console.log(player1.player_code);
});

get_symbols.forEach((s) => {
    s.addEventListener("click", function(){
        player1.mark = player1.get_player_mark_button_click(s);
        console.log(player1.mark);
        computer.mark = player1.mark.localeCompare("X")===0?"O":"X";
        console.log(computer.mark);
        begin();
    });
})

function begin(){
    let beginner = player1.mark.localeCompare("X")===0?player1.player_code:computer.player_code;
    let message_content = beginner + " begins the game";
    let msg_vw = message_view("#message", "#view-msg", message_content, 3000);
    msg_vw.view_message();
    computer.cnt = computer.first_move(gameboard, computer.mark);
    console.log("computer count: " + computer.cnt);
    player1.cnt = computer.cnt===0?1:0;
    console.log("player count: " + player1.cnt);
    count = computer.cnt===0?(count+1):(count);
    console.log("count: " + count);
}

board_buttons.forEach((btn) => 
    btn.addEventListener("click", function(){
    console.log("player's move with count: " + count);
    const indx = btn.value;
    const btn_dsply = btn.innerHTML;
    
    if(player1.player_code !== undefined && count%2 === player1.cnt && count < 9 && btn_dsply.localeCompare("") === 0 && stts_comp ===0){
        player1.gameboard_click(gameboard, indx, player1.mark);
        let stts_player = conclution(gameboard, player1.moves).concl();
        setTimeout(() => {
            conclude_game(stts_player, player1.player_code);
        },1000);        
        console.log(stts_player);
        count++;
        if(stts_player===0){
            setTimeout(() => {
                console.log("computer's round");
                let i = computer.add_sign(gameboard, computer.mark);
                stts_comp = conclution(gameboard, computer.moves).concl();
                setTimeout(() => {
                    conclude_game(stts_comp, computer.player_code);
                },1000);                
                console.log(stts_comp);
                count++;
            }, 1000);
        }                
    }
}));