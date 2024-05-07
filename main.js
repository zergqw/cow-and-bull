const rl = require('readline-sync');
let secrectNum = []; 
//Проверка на совпадение
const nonRepetitive = () => {
    let repetitive = 0
    for (const number of secrectNum) {
        if (repetitive === 2){
            secrectNum = secrectNum.replace(number, Math.floor(Math.random() * 10))
            nonRepetitive(secrectNum);
            return null
        }
        const num = Number(number);
        for (var i = 0; i < secrectNum.length; i++) {
            if (secrectNum.indexOf(secrectNum[i]) !== secrectNum.lastIndexOf(secrectNum[i])) { 
                repetitive++; 
            } 
        } 
    }
    return null
}
//Процесс проверки правильна ли комбинация
const check = (num) => {
    const bulls = [];
    const cow = [];
    for(const number of secrectNum) {
        for (const numberUser of num) {
            const numUser = Number(numberUser)
            const numSecret = Number(number)
            if (numSecret === numUser) {
                if (secrectNum.indexOf(numSecret) === num.indexOf(numUser)){
                    bulls.push(numUser)
                }
                else cow.push(numUser)
            }
        }
    }
    if (bulls.length === 4) {
        return 1
    }
    console.log( 'Cow:', cow.toString(), 'Bulls:', bulls.toString())
    return 0
}

const opponent = rl.question('Welcome to the bulls and cows game!\n Play with AI or friend? ');
//Начало для ии
if (opponent.toLowerCase() === 'ai') {
    exit = 0;
    //Проверка на уникальность.
    for (let count = 0; count < 4; count++){
        const nummer = Math.floor(Math.random() * 10)
        if (secrectNum.includes(nummer) === false) {
            secrectNum.push(nummer)
        }
    }
    //Количество ходов
    let turn = Number(rl.question('Write down the number of moves '))
    if (isNaN(turn + 1) === true){
        console.log('ERROR')
        turn = -1
    }
    //Основной этап игры
    while (exit === 0 && turn !== -1) {
        const numUser = rl.question('Write a sequence of numbers ')
        if (numUser.length != 4 || isNaN(Number(numUser) + 1) === true ) {
            console.log('ERROR')
        }
        else{
            if (check(numUser) === 1 ){
                exit = 1;
            }
        }
        turn--
    }
    if (turn === -1){
        console.log('You failed!')
        
    }
    else console.log('Congratulations!')
}
//Начало для живого человека
if (opponent.toLowerCase() === 'friend') {
    exit = 0;
    secrectNum = rl.question('Write a sectret sequence of numbers ')
    nonRepetitive()
    let turn = Number(rl.question('Write down the number of moves '))
    if (isNaN(turn + 1) === true || secrectNum.length < 4 || isNaN(Number(secrectNum) + 1) === true){
        console.log('ERROR')
        turn = -1
    }
    while (exit === 0 && turn !== -1) {
        const numUser = rl.question('Write a sequence of numbers ')
        if (numUser.length != 4 || isNaN(Number(numUser) + 1) === true ) {
            console.log('ERROR')
        }
        else{
            if (check(numUser) === 1 ){
                exit = 1;
            }
        }
        turn--
    }
    if (turn === -1){
        console.log('You failed!')
        
    }
    else console.log('Congratulations!')
}