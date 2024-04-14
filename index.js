function handleValue(value, errorIcon) { //handle the values and error-icon
    const tooltip = errorIcon.nextElementSibling; 

    if (isNaN(value)) {
        errorIcon.style.display = "block";
        return false;
    } else {
        errorIcon.style.display = "none";
        tooltip.style.display = "none"; 
        return true; 
    }
}
function calculateAmount(income, extraIncome, deductions, ageGroup){ //calculate amount 
    const totalIncome = parseFloat(income) + parseFloat(extraIncome) - parseFloat(deductions);
    if (totalIncome <= 800000) {
       return totalIncome;
    }
  else{
    const taxableAmount = totalIncome - 800000;
    let taxRate = 0;
 switch (ageGroup) {
        case 'under40':
            taxRate = 0.3; 
            break;
        case '40to60':
            taxRate = 0.4; 
            break;
        case '60plus':
            taxRate = 0.1; 
            break;
        default:
            taxRate = 0; 
    }
  const taxAmount = taxRate * taxableAmount;
    return (totalIncome-taxAmount);
}
}
function displayModal(totalIncome) { //diaplaying the model
    const modalContent = `
        <div class="modal">
            <div class="modal-content">
                 <p>Your total income is 
               <span> ₹${totalIncome.toLocaleString()}</span> <br/>
                after tax deductions</p>
              <button class="close">Close</button>
            </div>
        </div>
    `;
    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    document.body.appendChild(backdrop);
    document.body.insertAdjacentHTML('beforeend', modalContent);
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove(); 
            backdrop.remove();
        }
    });
}
function init() {  
    const form = document.getElementById('form');
    const inputs = document.querySelectorAll("input");
    const errorIcons = document.getElementsByClassName("error-icon");
    const helpers = document.querySelectorAll('.helper');
    const questionIcons = document.querySelectorAll('.fa-circle-question');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
     let isValid = true;
        inputs.forEach((input, index) => {
            const errorIcon = errorIcons[index];
            const isValidInput = handleValue(input.value, errorIcon);

            if (!isValidInput) {
                isValid = false;
            }
        });
 const ageSelect=document.getElementById("age");
        if (isValid) {
            const formData = {
                income: document.getElementById("income").value,
                extraIncome: document.getElementById("extra-income").value ,
                ageGroup: ageSelect.value,
                deductions: document.getElementById("deductions-income").value
            };//form data
            const Amount = calculateAmount(formData.income, formData.extraIncome, formData.deductions, formData.ageGroup);
        console.log(Amount);
           displayModal(Amount); //function that display the dom modal;
        
        }
    });
    inputs.forEach((input, index) => {
        const errorIcon = errorIcons[index];
        const tooltip = errorIcon.nextElementSibling;
   input.addEventListener("change", function(event) {
            handleValue(event.target.value, errorIcon);
        });
        errorIcon.addEventListener("mouseenter", function() {
            tooltip.style.display = "block"; 
        });
 errorIcon.addEventListener("mouseleave", function() {
            tooltip.style.display = "none"; 
        });
    });
    questionIcons.forEach((icon, index) => {
        const helper = helpers[index];
        icon.addEventListener('mouseenter', () => {
            helper.removeAttribute('hidden');
        });
        icon.addEventListener('mouseleave', () => {
            helper.setAttribute('hidden', 'true');
        });
    }
    )    
} 
init(); //calling the function init after the dom loaded