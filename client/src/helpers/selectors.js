import { isSameDay, parseISO, addDays, startOfWeek } from 'date-fns';

// = local helpers =
const getStatus = (submission) => {
  if (submission.dateCompleted) return 'Complete';
  if (submission.dateStarted) return 'Started';
  return 'Not started';
};


// = exported helpers =
export const findAssigned = (assignments, student) => {
  if (!student.id) return assignments.map((item) => ({ ...item, assigned: { dueDate: item.defaultDueDate } }));

  return student.submissions.map((submission) => ({
    ...assignments.find((assign) => assign.id === submission.assignmentId),
    assigned: { ...submission },
    status: getStatus(submission),
  }));
};

export const getDatesForWeek = (date) => {
  const startDate = startOfWeek(date);
  return [...Array(5)].map((_, i) => addDays(startDate, i));
};

export const sortAssignmentsByDay = (assignments, week) => {
  const sorted = assignments.sort((a, b) => parseISO(a.assigned.dueDate) - parseISO(b.assigned.dueDate));
  return week.map((day) => sorted.filter((item) => isSameDay(parseISO(item.assigned.dueDate), day))
  );
};