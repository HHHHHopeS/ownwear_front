export const calculateDatetime = date => {
    const currentDate = new Date();
    const postedDate = new Date(date);

    const postedYear = postedDate.getFullYear();
    const currentYear = currentDate.getFullYear();
    const postedMonth = postedDate.getMonth();
    const currentMonth = currentDate.getMonth();
    const postedDay = postedDate.getDate();
    const currentDay = currentDate.getDate();
    const postedHours = postedDate.getHours();
    const currentHours = currentDate.getHours();
    const postedMinutes = postedDate.getMinutes();
    const currentMinutes = currentDate.getMinutes();
    if (currentYear > postedYear) {
      if (currentMonth < postedMonth&&currentYear-postedYear===1) {
        return `${currentMonth + 12 - postedMonth}달전`;
      } else {
        return `${currentYear - postedYear}년전`;
      }
    } else {
      if (currentMonth > postedMonth) {
        if (currentMonth - postedMonth === 1 && currentDay < postedDay) {
          
          const lastDay = new Date(currentDay, currentMonth, 0).getDate();
          
          return `${currentDay + lastDay - postedDay}일전`;
        } else {
          return `${currentMonth - postedMonth}달전`;
        }
      } else {
        if (currentDay > postedDay) {
          if (currentDay - postedDay === 1 && currentHours < postedHours) {
            return `${currentHours + 24 - postedHours}시간전`;
          } else {
            return `${currentDay - postedDay}일전`;
          }
        } else {
          if (currentHours > postedHours) {
            if (
              currentHours - postedHours === 1 &&
              currentMinutes < postedMinutes 
            ) {
              return `${currentMinutes + 60 - postedMinutes}분전`;
            } else {
              return `${currentHours - postedHours}시간전`;
            } 
          } else {
            if (currentMinutes > postedMinutes) {
              return `${currentMinutes - postedMinutes}분전`;
            } else {
              return "방금전";
            }
          }
        }
      }
    }
  };