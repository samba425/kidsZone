// Progress and rewards management using localStorage

const STORAGE_KEYS = {
  TOTAL_STARS: 'kids_app_total_stars',
  ACHIEVEMENTS: 'kids_app_achievements',
  PROGRESS: 'kids_app_progress',
  DAILY_STREAK: 'kids_app_daily_streak',
  LAST_VISIT: 'kids_app_last_visit'
};

// Get total stars
export const getTotalStars = () => {
  return parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_STARS) || '0');
};

// Add stars
export const addStars = (count = 1) => {
  const current = getTotalStars();
  const newTotal = current + count;
  localStorage.setItem(STORAGE_KEYS.TOTAL_STARS, newTotal.toString());
  return newTotal;
};

// Get achievements
export const getAchievements = () => {
  const achievements = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
  return achievements ? JSON.parse(achievements) : [];
};

// Add achievement
export const addAchievement = (achievement) => {
  const achievements = getAchievements();
  if (!achievements.includes(achievement)) {
    achievements.push(achievement);
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    return true;
  }
  return false;
};

// Track category completion
export const markCategoryCompleted = (levelId, categoryId) => {
  const progress = getProgress();
  if (!progress[levelId]) {
    progress[levelId] = {};
  }
  progress[levelId][categoryId] = true;
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  
  // Check for achievements
  checkAchievements(progress);
};

// Get progress
export const getProgress = () => {
  const progress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  return progress ? JSON.parse(progress) : {};
};

// Check and award achievements
const checkAchievements = (progress) => {
  const completedCount = Object.values(progress).reduce((acc, level) => {
    return acc + Object.keys(level).length;
  }, 0);
  
  if (completedCount >= 1) addAchievement('first_category');
  if (completedCount >= 5) addAchievement('five_categories');
  if (completedCount >= 10) addAchievement('ten_categories');
  if (completedCount >= 20) addAchievement('twenty_categories');
  
  const totalStars = getTotalStars();
  if (totalStars >= 10) addAchievement('ten_stars');
  if (totalStars >= 50) addAchievement('fifty_stars');
  if (totalStars >= 100) addAchievement('hundred_stars');
};

// Daily streak
export const updateDailyStreak = () => {
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
  
  if (lastVisit === today) {
    return getDailyStreak();
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  let streak = getDailyStreak();
  
  if (lastVisit === yesterdayStr) {
    streak += 1;
  } else {
    streak = 1;
  }
  
  localStorage.setItem(STORAGE_KEYS.DAILY_STREAK, streak.toString());
  localStorage.setItem(STORAGE_KEYS.LAST_VISIT, today);
  
  return streak;
};

export const getDailyStreak = () => {
  return parseInt(localStorage.getItem(STORAGE_KEYS.DAILY_STREAK) || '0');
};

// Achievement definitions
export const ACHIEVEMENTS = {
  first_category: { emoji: '🎯', title: 'First Steps', description: 'Completed your first category!' },
  five_categories: { emoji: '⭐', title: 'Quick Learner', description: 'Completed 5 categories!' },
  ten_categories: { emoji: '🌟', title: 'Super Star', description: 'Completed 10 categories!' },
  twenty_categories: { emoji: '🏆', title: 'Champion', description: 'Completed 20 categories!' },
  ten_stars: { emoji: '✨', title: 'Shining Bright', description: 'Earned 10 stars!' },
  fifty_stars: { emoji: '💫', title: 'Star Collector', description: 'Earned 50 stars!' },
  hundred_stars: { emoji: '🌠', title: 'Superstar', description: 'Earned 100 stars!' }
};
