// Ustawienie wysokości:
const siteBody = window;
const contBody = document.getElementsByClassName('content-body').item(0);
siteBody.addEventListener('load', () => {
    currentHeight = siteBody.innerHeight;
    contBody.style.height = currentHeight + 'px';
}, false);
siteBody.addEventListener('resize', () => {
    currentHeight = siteBody.innerHeight;
    contBody.style.height = currentHeight + 'px';
}, false);


// Deklaracja głównych zmiennych:
let password_Input = document.getElementsByClassName('detector-detector-passwordCreate-input-proper')[0];
const password_Strength_Score_Result = document.getElementsByClassName('youPassword-strength')[0];
const yourPassword_Value = document.getElementsByClassName('youPassword-value')[0];
const yourPassword_Length = document.getElementsByClassName('youPassword-length')[0];
const smallLetter_Result = document.getElementsByClassName('smallLetter-counter')[0];
const bigLetter_Result = document.getElementsByClassName('bigLetter-counter')[0];
const number_Result = document.getElementsByClassName('number-counter')[0];
const specialSign_Result = document.getElementsByClassName('specialSign-counter')[0];
const passwordLength_Result = document.getElementsByClassName('passwordLength-counter')[0];
const bigLetter_Bonus = document.getElementsByClassName('bigLetter-bonus')[0];
const number_Bonus = document.getElementsByClassName('number-bonus')[0];
const specialSign_Bonus = document.getElementsByClassName('specialSign-bonus')[0];
const passwordMeter_Bar = document.getElementsByClassName('strengthBar-meter')[0];
const additionalInformations_Button = document.getElementsByClassName('addinInf-block')[0];
const additionalInformations_Proper = document.getElementsByClassName('additional-info')[0];
const square_Arrow = document.getElementsByClassName('squareArrow')[0];


let allActiveSigns = [   // 112 indeksów, czyli [111]
    'q', 'w', 'e', 'ę', 'r', 't', 'y', 'u', 'i', 'o', 'ó', 'p', 'a', 'ą', 's', 'ś', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ł', 'z', 'ż', 'ź', 'x', 'c', 'ć', 'v', 'b', 'n', 'ń', 'm', 
    "A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "R", "S", "Ś", "T", "U", "W", "X", "Y", "Z", "Ż", "Ź", "Q", "V", 
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 
    '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ':', ';', '"', "'", '\\', '|', '/', '?', '.', ",", '<', '>'
];

// Tablica małych liter:
let smallLetter_Array = [   // 35 indeksów, czyli [34]
    'q', 'w', 'e', 'ę', 'r', 't', 'y', 'u', 'i', 'o', 'ó', 'p', 'a', 'ą', 's', 'ś', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ł', 'z', 'ż', 'ź', 'x', 'c', 'ć', 'v', 'b', 'n', 'ń', 'm', 
];

// Tablica dużych liter:
let bigLetter_Array = [   // 35 indeksów, czyli [34]
    "A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G", "H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O", "Ó", "P", "R", "S", "Ś", "T", "U", "W", "X", "Y", "Z", "Ż", "Ź", "Q", "V"
];
// Tablica cyfr:
let number_Array = [   // 10 indeksów, czyli [9]
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];
let specialSign_Array = [   // 32 indeksów, czyli [31]
    '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', '[', ']', '{', '}', ':', ';', '"', "'", '\\', '|', '/', '?', '.', ",", '<', '>'
];


let password_Value = password_Input.value;
let password_Length = password_Input.length;
password_Length = 0
yourPassword_Value.textContent = "Your password: " + password_Value;
yourPassword_Length.textContent = "Your password characters length: " + password_Length;


let smallLetter_Counter = 0;
smallLetter_Result.textContent = "Small letters amount: " + smallLetter_Counter;

let bigLetter_Counter = 0;
bigLetter_Result.textContent = "Capital letters amount: " + bigLetter_Counter;

let number_Counter = 0;
number_Result.textContent = "Numbers amount: " + number_Counter;

let specialSign_Counter = 0;
specialSign_Result.textContent = "Special characters amount: " + specialSign_Counter;

let currentLetter = 0;
var preventKeypress = false;

// Bonusy za TYLKO jeden typ znaków w haśle (A, 1, =):
let extraPoints_BigLetter = 1;
bigLetter_Bonus.textContent = "Capital letter bonus: " + "NO";
let extraPoints_Number = 1;
number_Bonus.textContent = "Small letter bonus: " + "NO";
let extraPoints_SpecialSign = 1;
specialSign_Bonus.textContent = "Special character bonus: " + "NO";
let extraPoints_BigLetter_Target = 1.6;   // Default: 1.6
let extraPoints_Number_Target = 1.65;   // Default: 1.6
let extraPoints_SpecialSign_Target = 1.70;   // Default: 1.6

// Graficzny miernik hasła:
let password_Meter_Width = 0;
let password_Meter_HslHue = 0;
let hue_OnePercent = 0;

password_Input.addEventListener('keydown', (event) => {
    // MEGA WAŻNE: trzeba wyznaczyć jake klawisze aktywują funkcję, w przeciwnym razie, kiedy będizemy wciskali shif, 
    // aby wpisać dużą litrę, do do licznika zostaną dodane dwie 1, gdyż aby uzyskać dużą literę wciska się shift i literę: (shift + k). Jako że shift w tym przypadku 
    // jest powiązany z litreą, aby uzyskać ją dużą, dodawane są dwie 1, czyli zamiast 1 mamy 2 (- do licznika dużych znaków, 1 / 1 znak, a tu mamy 2 / 1, co jest błędne).
    let key = event.key;
    for (a = 0; a < allActiveSigns.length; a++) {
        if (key == allActiveSigns[a]) {
            preventKeypress = false;
            setTimeout( () => {
                checkPasswordKeyGroup();
            }, 1);
            setTimeout( () => {
                checkPasswordAllKeys();
            }, 2);
          // Kasowanie hasła za pomocą bocznych klaswiszy
        } else if (key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown" || key === "Tab" || key === " " || key == "Backspace" || key == "Numpad7") {
            erasePasswordAndInfo();
        }
    }
}, false);

function checkPasswordKeyGroup() {
    let password = password_Input.value;
    currentLetter = password.length - 1;   // ".length" liczy elementy zaczynając od 0, a nie od 0 w przypaku kolekcji NodeList, dlatego trzeba odjąć 1 
    // Małe litery:
    for (i = 0; i < smallLetter_Array.length; i++) {
        if (password.charAt(currentLetter) == smallLetter_Array[i]) {
            smallLetter_Counter += 1;
            smallLetter_Result.textContent = "Small letters amount: " + smallLetter_Counter;
        } else {}
    };
    // Duże litery:
    for (i = 0; i < bigLetter_Array.length; i++) {
        if (password.charAt(currentLetter) == bigLetter_Array[i]) {
            bigLetter_Counter += 1;
            bigLetter_Result.textContent = "Capital letters amount: " + bigLetter_Counter;
            extraPoints_BigLetter = extraPoints_BigLetter_Target;
            bigLetter_Bonus.textContent = "Capital letter bonus: " + "YES";
        } else {}
    };
    // Cyfry:
    for (i = 0; i < number_Array.length; i++) {
        if (password.charAt(currentLetter) == number_Array[i]) {
            number_Counter += 1;
            number_Result.textContent = "Numbers amount: " + number_Counter;
            extraPoints_Number = extraPoints_Number_Target;
            number_Bonus.textContent = "Small letter bonus: " + "YES";
        } else {}
    };
    // Znaki specjalne:
    for (i = 0; i < specialSign_Array.length; i++) {
        if (password.charAt(currentLetter) == specialSign_Array[i]) {
            specialSign_Counter += 1;
            specialSign_Result.textContent = "Special characters amount: " + specialSign_Counter;
            extraPoints_SpecialSign = extraPoints_SpecialSign_Target;
            specialSign_Bonus.textContent = "Special character bonus: " + "YES";
        } else {}
    };
}

// Kasowanie hasła za pomocą kliknięcia w inputa
password_Input.addEventListener('click', () => {
    erasePasswordAndInfo();
}, false);

function erasePasswordAndInfo() {
    password_Input.value = "";//msk(/]1Lq-}`/.3ljE)
    password_Value = "";
    password_Meter_Width = 0;
    passwordMeter_Bar.style.width = password_Meter_Width + "%";
    yourPassword_Value.textContent = "Your password: " + password_Value;
    smallLetter_Counter *= 0;
    smallLetter_Result.textContent = "Small letters amount: " + smallLetter_Counter;
    bigLetter_Counter *= 0;
    bigLetter_Result.textContent = "Capital letters amount: " + bigLetter_Counter;
    number_Counter *= 0;
    number_Result.textContent = "Numbers amount: " + number_Counter;
    specialSign_Counter *= 0;
    specialSign_Result.textContent = "Special characters amount: " + specialSign_Counter;
    yourPassword_Length.textContent = "Your password characters length: " + 0;
    password_Strength_Score_Result.textContent = "Your password strength: " + 0 + "%";
    extraPoints_BigLetter = 1;
    bigLetter_Bonus.textContent = "Capital letter bonus: " + "NO";
    extraPoints_Number = 1;
    number_Bonus.textContent = "Small letter bonus: " + "NO";
    extraPoints_SpecialSign = 1;
    specialSign_Bonus.textContent = "Special character bonus: " + "NO";
    for (i = 0; i < allActiveSigns.length; i++) {
        countSign_Array[i] = 0;
        keyScore_Array[i] = 0;
        counterNodes[i].textContent = "Characters amount: [ " + allActiveSigns[i] + " ] = " + countSign_Array[i]/* + "  |  " + "Points: " + keyScore_Array[i]*/;
    }
}



for (i = 0; i < allActiveSigns.length; i++) {
    const new_div = document.createElement('div');
    new_div.setAttribute('class', 'singleSignArea');
    const new_div_Location = document.querySelectorAll('div.additional-info')[0];
    new_div_Location.appendChild(new_div);
}
const counterNodes = [];
for (i = 0; i < allActiveSigns.length; i++) {
    counterNodes[i] = document.getElementsByClassName('singleSignArea')[i];
}
let countSign_Array = [];
for (i = 0; i < allActiveSigns.length; i++) {
    countSign_Array[i] = 0;
}
for (i = 0; i < allActiveSigns.length; i++) {
    counterNodes[i].textContent = countSign_Array[i];
}

(function() {
    for (i = 0; i < allActiveSigns.length; i++) {
        counterNodes[i].textContent = "Characters amount: [ " + allActiveSigns[i] + " ] = " + countSign_Array[i];
    }; 
}());

let keyScore_Array = [];
for (i = 0; i < allActiveSigns.length; i++) {
    keyScore_Array[i] = 0;
};

(function() {
    for (i = 0; i < allActiveSigns.length; i++) {
        countSign_Array[i] = 0;
        keyScore_Array[i] = 0;
        counterNodes[i].textContent = "Characters amount: [ " + allActiveSigns[i] + " ] = " + countSign_Array[i]/* + "  |  " + "Points: " + keyScore_Array[i]*/;
    };
}());

(function() {
    let password_Strength_Score = 0;
    password_Strength_Score_Result.textContent = "Your password strength: " + password_Strength_Score + "%";
}());

function checkPasswordAllKeys() {
    let password = password_Input.value;
    currentLetter = password.length - 1;
    for (a = 0; a < allActiveSigns.length; a++) {
        if (password.charAt(currentLetter) == allActiveSigns[a]) {
            countSign_Array[a] += 1;
            counterNodes[a].textContent = "Ilość znaków: [ " + allActiveSigns[a] + " ] = " + countSign_Array[a];
        } else {}
    };
    yourPassword_Value.textContent = "Your password: " + password;
    yourPassword_Length.textContent = "Your password characters length: " + password.length;

    // Obliczanie silności hasła:
    // 1. Punkty za rzadkość pojedyńczych liter:
    let password_Length = password.length;
    let password_LetterRarity_Strength_Score = 0;
    for (i = 0; i < allActiveSigns.length; i++) {
        keyScore_Array[i] = countSign_Array[i];
        keyScore_Array[i] = password_Length / countSign_Array[i];
        if (keyScore_Array[i] == Infinity) {
            keyScore_Array[i] = 0;
        } else {}
        password_LetterRarity_Strength_Score += keyScore_Array[i];
        counterNodes[i].textContent = "Characters amount: [ " + allActiveSigns[i] + " ] = " + countSign_Array[i]/* + "  |  " + "Points: " + keyScore_Array[i]*/;
    }
    // 2. Punkty za długość hasła:
    let password_Length_Strength_Score = 0;
    let toPow_Value = 1.17;   // Default: 1.17    //    < - - -    K O N T R O L A    P O T Ę G I    D O    D Ł U G O Ś Ć I    H A S Ł A
    password_Length_Strength_Score = Math.pow(toPow_Value, password_Length);
    // 3. Suma silności hasła:
    let password_ExtraPoints = 0;
    password_ExtraPoints = ((extraPoints_BigLetter + extraPoints_Number + extraPoints_SpecialSign) / 3);
    let password_OverStrength_Score = 0;
    password_OverStrength_Score = ((password_LetterRarity_Strength_Score + password_Length_Strength_Score) * password_ExtraPoints);
    //password_Strength_Score_Result.textContent = "Siła twojego hasła: " + Math.floor(password_OverStrength_Score);
    // 4. Limit silności hasła: (Przykład: 18 znaków, 324 + 426 (pow: 1.4) = 750)
    let proper_Password_Strength_Score = 0;
    let toLimit_MaxKey_Amount = 20;    //    < - - -    K O N T R O L A    S K A L I
    let password_MaxExtraPoints = 1;
    password_MaxExtraPoints = ((extraPoints_BigLetter_Target + extraPoints_Number_Target + extraPoints_SpecialSign_Target) / 3);
    password_Strenght_OnePercent = (((Math.pow(toLimit_MaxKey_Amount, 2) + Math.pow(toPow_Value, toLimit_MaxKey_Amount)) * password_MaxExtraPoints) / 100);
    proper_Password_Strength_Score = password_OverStrength_Score / password_Strenght_OnePercent;
    if (proper_Password_Strength_Score <= 100) {
        password_Strength_Score_Result.textContent = "Your password strength: " + Math.floor(proper_Password_Strength_Score) + "%";
    } else if (proper_Password_Strength_Score > 100) {
        password_Strength_Score_Result.textContent = "Your password strength: " + 100 + "%";
    }
    //alert(password_MaxExtraPoints);

    // Modyfikowanie graficznego miernika hasła:
    let hueLimit = 110;
    hue_OnePercent = hueLimit / 100;
    password_Meter_Width = proper_Password_Strength_Score;
    password_Meter_HslHue = hue_OnePercent * proper_Password_Strength_Score;
    if (proper_Password_Strength_Score <= 100) {
        passwordMeter_Bar.style.width = Math.floor(password_Meter_Width) + "%";
        passwordMeter_Bar.style.backgroundColor = "hsl(" + password_Meter_HslHue + ", 85%, 50%)";
    } else if (proper_Password_Strength_Score > 100) {
        passwordMeter_Bar.style.width = 100 + "%";
        passwordMeter_Bar.style.backgroundColor = "hsl(" + hueLimit + ", 85%, 50%)";
    }
}

// Dodatkowe informacje:
let addInf_Count = 0;
additionalInformations_Button.addEventListener('click', () => {
    addInf_Count += 1;
    if (addInf_Count == 1) {
        additionalInformations_Proper.style.display = 'block';
        square_Arrow.style.rotate = '-135deg';
    } else if (addInf_Count == 2) {
        addInf_Count *= 0;
        additionalInformations_Proper.style.display = 'none';
        square_Arrow.style.rotate = '45deg';
    }
}, false);



// PRZYCZYNA ZNALEZIONA 
// Trzeba ograniczyć  event keypress do małych i dużych liter, cyfr oraz znaków specjalnych!
// Z tego powodu miałem przesunięcie o jeden indeks do przodu na dużych literech, i na cyfrach z niestety niewiadomego powodu.