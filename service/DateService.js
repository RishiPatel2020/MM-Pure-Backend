class DateService {
  isSaturday() {
    return new Date().getDay() === 6;
  }

  isSunday() {
    return new Date().getDay() === 0;
  }

  closestUpcomingSunday() {
    const today = new Date();
    let dayToday = today.getDay();
    let diff = (7 - dayToday) % 7;
    // today = first sunday
    today.setDate(today.getDate() + diff);
    return "Sunday: " + today.toLocaleDateString();
  }
}

export default new DateService();
