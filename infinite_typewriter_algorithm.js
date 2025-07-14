/*
A silly algorithm which when given infinite time, shall generate algorithms and solutions to problems like this:
-Perfect AI,
-A true physics simulator,
-This exact code,
-Any unknown algorithm for any problem,
-It could find a program that proves or disproves mathematical conjectures,
-The meaning of life (theoretically).

Time complexity:
-Bruteforce: O(C^N)
-Random: O(C^N) BUT this is the expected, it may find longer code faster but it may never find anything.

Where C is the length of possible chars, and N is the searched maximum length.

Proof, that this algorithm will find any algorithm which's code consists of finite characters and will halt if exists such a testing function which can perfectly describe the characteristics of the seeked algorithm. (IF GIVEN A LARGE ENOUGH FINITE TIME):
-!B is the algorithm which needs to be found, (it's code is finite characters and will halt.
-!A string which was generated systematically be the bruteforce generator.
-The length of B is n and A is m. (m and n is finite integer)
The exact values of n, and B is not need to be known.

A= new generated string;
If the m is smaller than n, then generate a new string and set the value of A to the newly generated string.
If m is equal to n, then check if A==B. If not, generate a new string, if yes: the algorithm found B.

Why does it work?:
-n is not infinite, and the bruteforce algorithm checks all possibilities, which means, eventually m will be n and with the right validation the algorithm can be verified.

*/
"use-strict";
const possiblechars="varlet$=-+{}()/*\"':;!? bcdfghijkmnopqsuwxyz1234567890";
function validate_algorithm(what="var a=1;"){ //Helper funcions
    try {
        eval(what);
    } catch (error) {
        return false;
    }
    return true;

}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}


let iter=0;
let str="";
let len;
function generate_random_string(minlen=1,maxlen=2){
    
    str="";
    len=minlen+getRandomInt(maxlen+1);
    for(iter=0;iter<len;iter++){
        str+=possiblechars[getRandomInt(possiblechars.length)];
    }
    return str;
}

function* generate_strings(length) {
    const C = possiblechars.length;
    let indices = new Array(length).fill(0);

    while (true) {
        
        let attempt = indices.map(i => possiblechars[i]).join("");

        yield attempt;

        for (let i = length - 1; i >= 0; i--) {
            if (indices[i] < C - 1) {
                indices[i]++;
                break;
            }
            indices[i] = 0;
            if (i === 0) return;
        }
    }
}

function typewriter(brute_force=false,amount=999,min_len=1,max_len=2){
    let found_amount=0;
    let strs=[];
    let exit=false;
    let length=min_len;
    while(exit===false){
        if(brute_force===true){
            let generator = generate_strings(length,amount);
            for (let code of generator) {
                if (validate_algorithm(code)===true) {
                    strs.push(code);
                    found_amount++;
                    if(found_amount>=amount){
                        exit=true;
                        break;
                    }
                }
            }
            length++;
            if(max_len<length){
                exit=true;
            }
        } else {
            let code1=generate_random_string(min_len,max_len);
            if (validate_algorithm(code1)===true) {
                strs.push(code1);
                found_amount++;
                if(found_amount>=amount){
                    exit=true;
                    break;
                }
            }
        }
        
    }
    
    return strs;
}

let is_brute_forcing=false;
let max_finds=10;
let min_len=10;
let max_len=20;

//Example usage
let result=typewriter(is_brute_forcing,max_finds,min_len,max_len);
for(let i=0;i<max_finds;i++){
    console.log(result[i]+"\n");
}