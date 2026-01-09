exports.calculateGrade = (marks) => {
  if (marks >= 80) return { grade: 'A+', point: 5.0 };
  if (marks >= 70) return { grade: 'A',  point: 4.0 };
  if (marks >= 60) return { grade: 'A-', point: 3.5 };
  if (marks >= 50) return { grade: 'B',  point: 3.0 };
  if (marks >= 40) return { grade: 'C',  point: 2.0 };
  if (marks >= 33) return { grade: 'D',  point: 1.0 };
  return { grade: 'F', point: 0.0 };
};