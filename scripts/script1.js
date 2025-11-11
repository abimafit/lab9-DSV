document.addEventListener('DOMContentLoaded', function() {
    const grade1Input = document.getElementById('grade1');
    const grade2Input = document.getElementById('grade2');
    const grade3Input = document.getElementById('grade3');
    const error1 = document.getElementById('error1');
    const error2 = document.getElementById('error2');
    const error3 = document.getElementById('error3');
    const calculateBtn = document.getElementById('calculate');
    const resetBtn = document.getElementById('reset');
    const resultDiv = document.getElementById('result');
    const averageSpan = document.getElementById('average');
    const letterGradeSpan = document.getElementById('letterGrade');

    // Funcion que valida la nota
    function validateGrade(grade, errorElement) {
        const value = parseFloat(grade);
        if (isNaN(value) || value < 0 || value > 100) {
            errorElement.style.display = 'block';
            return false;
        } else {
            errorElement.style.display = 'none';
            return true;
        }
    }

    // Funcion que calcula la nota
    function calculateLetterGrade(average) {
        if (average >= 91) return 'A';
        if (average >= 81) return 'B';
        if (average >= 71) return 'C';
        if (average >= 61) return 'D';
        return 'F';
    }
    function getGradeClass(letter) {
        return `grade-${letter}`;
    }

    //calcular el promedio
    calculateBtn.addEventListener('click', function() {
        const grade1 = grade1Input.value;
        const grade2 = grade2Input.value;
        const grade3 = grade3Input.value;
        
        const isValid1 = validateGrade(grade1, error1);
        const isValid2 = validateGrade(grade2, error2);
        const isValid3 = validateGrade(grade3, error3);
        
        //aqui es donde se decide que nota sacaste
        if (isValid1 && isValid2 && isValid3) {
            // Calcular promedio
            const average = (parseFloat(grade1) + parseFloat(grade2) + parseFloat(grade3)) / 3;
        
            const letterGrade = calculateLetterGrade(average);
            
            averageSpan.textContent = average.toFixed(2);
            letterGradeSpan.textContent = letterGrade;
            
            letterGradeSpan.className = 'letter-grade ' + getGradeClass(letterGrade);
            

            resultDiv.style.display = 'block';
        }
    });

    resetBtn.addEventListener('click', function() {
        grade1Input.value = '';
        grade2Input.value = '';
        grade3Input.value = '';
        error1.style.display = 'none';
        error2.style.display = 'none';
        error3.style.display = 'none';
        resultDiv.style.display = 'none';
    });

    grade1Input.addEventListener('input', function() {
        validateGrade(this.value, error1);
    });

    grade2Input.addEventListener('input', function() {
        validateGrade(this.value, error2);
    });

    grade3Input.addEventListener('input', function() {
        validateGrade(this.value, error3);
    });
});