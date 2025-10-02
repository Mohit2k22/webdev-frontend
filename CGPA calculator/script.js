
    const gradeToPoint = {
      "A+": 4.00,
      "A": 3.75,
      "A-": 3.50,
      "B+": 3.25,
      "B": 3.00,
      "B-": 2.75,
      "C+": 2.50,
      "C": 2.25,
      "D": 2.00,
      "F": 0.00
    };

   
    function addCourse() {
      const container = document.getElementById('course-container');
      const div = document.createElement('div');
      div.className = 'course-row';
      div.innerHTML = `
        <input type="number" placeholder="Credit Hours">
        <input type="text" placeholder="SCGPA (A+, A, A-, etc.)">
        <button class="delete-btn" onclick="deleteCourse(this)">×</button>
      `;
      container.appendChild(div);
    }

    function deleteCourse(btn) {
      const row = btn.parentElement;
      row.remove();
    }

    function resetAll() {
      const container = document.getElementById('course-container');
      container.innerHTML = '';
      addCourse(); // start fresh with one empty row
      document.getElementById('result').textContent = '';
    }

    function calculateCGPA() {
      const rows = document.querySelectorAll('.course-row');
      let totalGradePoints = 0;
      let totalCredits = 0;

      rows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        const credit = parseFloat(inputs[0].value);
        const grade = inputs[1].value.toUpperCase();
        const gradePoint = gradeToPoint[grade];

        if (!isNaN(credit) && gradePoint !== undefined) {
          totalGradePoints += credit * gradePoint;
          totalCredits += credit;
        }
      });

      const result = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(5) : '0';
      document.getElementById('result').textContent = `Your CGPA is: ${result}`;
    }

    function printResult() {
      const resultText = document.getElementById('result').textContent;
      if (resultText) {
        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write(`<pre style="font-size: 20px;">${resultText}</pre>`);
        printWindow.document.close();
        printWindow.print();
      }
    }
  